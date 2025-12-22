import { User } from '../entities/user.entity';

export abstract class UserCommandRepository {
  abstract save(user: User): Promise<void>;
}
