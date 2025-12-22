import { Module } from '@nestjs/common';

import { UserController } from './presentation/controllers/user.controller';

// 도메인 인터페이스
import { UserReadRepository } from './domain/repositories/user-read.repository';
// import { UserSearchRepository } from './domain/repositories/user-search.repository';

// 인프라 구현체
import { UserReadPostgresRepository } from './infrastructure/persistence/user-read-postgres.repository';
// import { UserSearchElasticsearchRepository } from './infrastructure/search/user-search-es.repository';

// UseCases
import { GetUserByIdUseCase } from './application/get-user-by-id.use-case';
// import { SearchUserUseCase } from './application/search-user.use-case';

@Module({
  imports: [
    // ES, Redis 클라이언트를 주입해주는 모듈들
    // 예: DbModule, SearchModule, CacheModule 등
  ],
  controllers: [UserController],
  providers: [
    // ─────────────────────────────
    // Repository 인터페이스 → 구현체 매핑
    // ─────────────────────────────
    {
      provide: UserReadRepository,
      useClass: UserReadPostgresRepository,
    },
    // {
    //   provide: UserSearchRepository,
    //   useClass: UserSearchElasticsearchRepository,
    // },

    // UseCases
    GetUserByIdUseCase,
    // SearchUserUseCase,
  ],
  exports: [
    // 필요하면 UseCase를 다른 모듈에서 재사용할 수 있게 export
    GetUserByIdUseCase,
    // SearchUserUseCase,
  ],
})
export class UserModule {}
