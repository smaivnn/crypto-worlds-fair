import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { PG_POOL } from '../../../../infra/database/postgres/pg.constants';
import { UserCommandRepository } from '../../domain/repositories/user-command.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserCommandPostgresRepository implements UserCommandRepository {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  // tx를 optional로 받아서 트랜잭션/비트랜잭션 모두 지원
  async save(user: User, tx?: PoolClient): Promise<void> {
    const executor = tx ?? this.pool;

    await executor.query(
      `
      insert into users (id, email, name, created_at)
      values ($1, $2, $3, $4)
      on conflict (id) do update
      set
        email = excluded.email,
        name = excluded.name
      `,
      [user.id, user.email, user.name, user.createdAt],
    );
  }
}
