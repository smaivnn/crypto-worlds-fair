import { Injectable } from '@nestjs/common';
import { UserSearchRepository } from '../domain/repositories/user-search.repository';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class SearchUserUseCase {
  constructor(private readonly userSearchRepository: UserSearchRepository) {}

  async execute(keyword: string): Promise<User[]> {
    if (!keyword || keyword.length < 2) {
      return [];
    }
    return this.userSearchRepository.searchByKeyword(keyword);
  }
}
