import { User } from '../entities/user.entity';

export abstract class UserReadRepository {
  abstract findById(id: string): Promise<User | null>;
}
