// src/modules/user/application/use-cases/update-user-name.use-case.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserReadRepository } from '../domain/repositories/user-read.repository';
import { UserCommandRepository } from '../domain/repositories/user-command.repository';
import { UserSearchRepository } from '../domain/repositories/user-search.repository';
// import { UserCacheRepository } from '../domain/repositories/user-cache.repository';

@Injectable()
export class UpdateUserNameUseCase {
  constructor(
    private readonly userReadRepository: UserReadRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly userSearchRepository: UserSearchRepository,
    // private readonly userCacheRepository: UserCacheRepository,
  ) {}

  async execute(id: string, newName: string): Promise<void> {
    const user = await this.userReadRepository.findById(id);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    user.changeName(newName);

    // 1) 메인 DB에 저장
    await this.userCommandRepository.save(user);

    // 2) 검색 인덱스 갱신
    await this.userSearchRepository.indexUser(user);

    // 3) 캐시 무효화
    // await this.userCacheRepository.invalidateUser(user.id);
  }
}
