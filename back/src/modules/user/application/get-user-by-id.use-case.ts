import { Injectable, NotFoundException } from '@nestjs/common';
import { UserReadRepository } from '../domain/repositories/user-read.repository';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userReadRepository: UserReadRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userReadRepository.findById(id);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    return user;
  }
}
