```
user/
├── user.module.ts
├── application/
│   ├── get-user-by-id.use-case.ts
│   ├── search-user.use-case.ts
│   └── update-user-name.use-case.ts
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── repositories/
│   │   ├── readme.md
│   │   ├── user-command.repository.ts
│   │   ├── user-read.repository.ts
│   │   └── user-search.repository.ts
├── infrastructure/
│   ├── persistence/
│   │   ├── user-command-postgres.repository.ts
│   │   └── user-read-postgres.repository.ts
│   ├── search/
│   │   └── user-search-es.repository.ts
├── presentation/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── dto/
│   │   ├── update-user-name.dto.ts
│   │   └── user-response.dto.ts
```

# Domain

- 이 시스템이 무엇을 하는지에 대한 표현
- 도메인 규칙, 상태, 불변 조건
- 엔티티 상태 변경 메서드
- 도메인 레포지토리 인터페이스도 여기에 위치
  - UserReadRepository, UserCommandRepository 같은 것들

ex)

```
class User {
  changeName(newName: string) {
    if (!newName || newName.length < 2) {
      throw new Error('이름은 2자 이상이어야 합니다.');
    }
    this.name = newName;
  }

  canChangeName(role: UserRole): boolean {
    return role === 'ADMIN' || role === 'OWNER';
  }
}
```

- 이름은 2자 이상이어야 한다
- 어떤 역할만 이름 변경이 가능하다

이는 DB랑 관계없는 비즈니스 규칙으로, useCase가 아닌 Domain에 작성

useCase는 이런 도메인 메서드를 조합해서 시나리오를 만드는 레벨

DB랑 관계없는 비즈니스 규칙은 도메인에 두고,
useCase는 이 도메인 메서드들을 조합해서 시나리오를 만든다

# Application(useCase)

언제 어떤 순서로 무엇을 실행할지를 담당, 유저 입장에서 기능 단위 구성

유스케이스 단위의 시나리오:

- 유스케이스 하나 = 하나의 기능 흐름
- 여러 레포지토리/도메인 서비스/인프라를 조합
- 트랜잭션의 경계, 이벤트 발행 등
- ex) “유저 찾기 → 권한 체크 → 이름 변경 → 저장 → 캐시 무효화 → 이벤트 발행”

주요 내용:

- 권한 체크
- 도메인 메서드 호출 (user.changeName)
- 여러 레포지토리 조합
- 캐시/검색 DB 동기화 순서

```ts
 async execute(input: { id: string; newName: string; role: 'ADMIN' | 'OWNER' | 'USER' }) {
    const user = await this.userReadRepo.findById(input.id);
    if (!user) throw new NotFoundException();

    if (!user.canChangeName(input.role)) {
      throw new ForbiddenException();
    }

    user.changeName(input.newName);

    await this.userCommandRepo.save(user);      // 메인 DB
    await this.userSearchRepo.indexUser(user);  // 검색 인덱스
    await this.userCacheRepo.invalidateUser(user.id); // 캐시 무효화
  }
```

- 권한체크 + 이름변경 + 여러 시스템 동기화라는 시나리오
- 실제 규칙/검증은 도메인에 위임

# infrastructure

어떻게 저장/조회/통신할 지 구현하는 곳
DB, 검색, 캐시, 외부 API등 기술 의존적 코드가 모임

- Repository 인터페이스 구현 (DB 쿼리)
  - 쿼리 작성
- ES, Redis, 외부 API 호출
- Row ↔ 도메인 엔티티 매핑
- 인프라 레벨에서 필요한 전처리
  - DB 넣기 전 JSON.stringify() 같은 것

# Presentation

외부 요청 레이어, 컨트롤러, DTO, Validation 등

- 외부 요청 레이어 (HTTP, GraphQL 등)
- Controller, DTO, Validator
- 인증/인가(Guard), 요청 파싱, 응답 포맷팅
- “어떤 UseCase를 호출할지”만 결정하고, 비즈니스 로직/쿼리는 모름

```ts
@Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.getUserById.execute(id);
    return UserResponseDto.from(user);
  }
```

트랜잭션 묶는 예시

```ts
import { withTransaction } from '@/infra/database/postgres/pg.tx';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async execute(user: User) {
    return withTransaction(this.pool, async (tx) => {
      // 같은 tx로 여러 repo 호출 가능
      await this.userCommandRepo.save(user, tx);
      // await this.userLogRepo.insert(..., tx);
    });
  }
}
```

인터페이스도 변경하여야 함

```ts
import { PoolClient } from 'pg';
import { User } from '../entities/user.entity';

export interface UserCommandRepository {
  save(user: User, tx?: PoolClient): Promise<void>;
}
```

- 최종 반환을 컨트롤러에서 DTO로 바꿔도 되고,
  useCase에서 DTO까지 만들어서 반환해도 되지만,
  보통은 useCase는 도메인 모델을, Controller가 DTO 변환을 맡는 편이 깔끔하다
