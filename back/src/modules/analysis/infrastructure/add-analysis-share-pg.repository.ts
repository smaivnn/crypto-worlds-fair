import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import {
  AddAnalysisShareInput,
  AddAnalysisShareRepository,
} from '../domain/repositories/add-analysis-share.repository';

@Injectable()
export class AddAnalysisSharePostgresRepository
  implements AddAnalysisShareRepository
{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async addShareLink(
    input: AddAnalysisShareInput,
    tx?: PoolClient,
  ): Promise<void> {
    const executor = tx ?? this.pool;
    await executor.query(
      `
      insert into analysis_share
        (share_id, session_id, expires_at)
      values
        ($1, $2, $3)
      `,
      [input.shareId, input.sessionId, input.expiresAt],
    );
  }
}
