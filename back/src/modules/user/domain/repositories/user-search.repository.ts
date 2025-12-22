import { User } from '../entities/user.entity';

export abstract class UserSearchRepository {
  abstract searchByKeyword(keyword: string): Promise<User[]>;
  abstract indexUser(user: User): Promise<void>;
}
