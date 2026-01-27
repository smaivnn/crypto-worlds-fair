import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import {
  FindAnalysisShareRepository,
  FindAnalysisShareResult,
} from '../domain/repositories/find-analysis-share.repository';

@Injectable()
export class FindAnalysisSharePostgresRepository
  implements FindAnalysisShareRepository
{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async findValidShareByInputHash(
    inputHash: string,
    tx?: PoolClient,
  ): Promise<FindAnalysisShareResult | null> {
    const executor = tx ?? this.pool;
    const result = await executor.query(
      `
      select
        s.share_id,
        s.expires_at
      from analysis_share s
      join analysis_session sess
        on sess.id = s.session_id
      where sess.input_hash = $1
        and s.revoked_at is null
        and (s.expires_at is null or s.expires_at > now())
      limit 1
      `,
      [inputHash],
    );

    const row = result.rows[0];
    if (!row) return null;

    return {
      shareId: row.share_id,
      expiresAt: row.expires_at ?? null,
    };
  }
}
