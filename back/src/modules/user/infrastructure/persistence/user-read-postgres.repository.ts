import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import { UserReadRepository } from '../../domain/repositories/user-read.repository'; // 추상화된 리포지토리 인터페이스
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserReadPostgresRepository implements UserReadRepository {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const params = [id];
    const { rows } = await this.pool.query(
      `
      SELECT id, email, name, created_at
      FROM users
      WHERE id = $1
      `,
      params,
    );

    const row = rows[0];
    if (!row) return null;

    return new User(row.id, row.email, row.name, new Date(row.created_at));
  }
}
