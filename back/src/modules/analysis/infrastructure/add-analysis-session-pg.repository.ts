import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { PG_POOL } from '@/infra/database/postgres/pg.constants';
import {
  AddAnalysisSessionInput,
  AddAnalysisSessionRepository,
  AddAnalysisSessionResult,
} from '../domain/repositories/add-analysis-session.repository';

@Injectable()
export class AddAnalysisSessionPostgresRepository
  implements AddAnalysisSessionRepository
{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async addSession(
    input: AddAnalysisSessionInput,
    tx?: PoolClient,
  ): Promise<AddAnalysisSessionResult> {
    const executor = tx ?? this.pool;
    const result = await executor.query(
      `
      insert into analysis_session
        (version, locale, profile, answers, free_copy, input_hash)
      values
        ($1, $2, $3, $4, $5, $6)
      returning id
      `,
      [
        input.version,
        input.locale,
        JSON.stringify(input.profile),
        JSON.stringify(input.answers),
        JSON.stringify(input.freeCopy),
        input.inputHash ?? null,
      ],
    );

    return { id: result.rows[0]?.id as string };
  }
}
