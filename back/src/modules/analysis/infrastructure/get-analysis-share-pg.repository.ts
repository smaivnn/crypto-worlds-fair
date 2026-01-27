import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import {
  GetAnalysisShareRepository,
  GetAnalysisShareResult,
} from '../domain/repositories/get-analysis-share.repository';

@Injectable()
export class GetAnalysisSharePostgresRepository
  implements GetAnalysisShareRepository
{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async findByShareId(
    shareId: string,
    tx?: PoolClient,
  ): Promise<GetAnalysisShareResult | null> {
    const executor = tx ?? this.pool;
    const result = await executor.query(
      `
      select
        s.share_id,
        s.expires_at,
        s.revoked_at,
        sess.version,
        sess.locale,
        sess.free_copy
      from analysis_share s
      join analysis_session sess
        on sess.id = s.session_id
      where s.share_id = $1
      limit 1
      `,
      [shareId],
    );

    const row = result.rows[0];
    if (!row) return null;

    return {
      shareId: row.share_id,
      expiresAt: row.expires_at ?? null,
      revokedAt: row.revoked_at ?? null,
      version: row.version,
      locale: row.locale,
      freeCopy: row.free_copy,
    };
  }
}
