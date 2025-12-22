import {
  Inject,
  Logger,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from './pg.constants';
import { PgPoolProvider } from './pg.pool.provider';

@Module({
  providers: [PgPoolProvider],
  exports: [PG_POOL],
})
export class PgModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PgModule.name);

  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  // DB모듈 연결 직후
  async onModuleInit() {
    try {
      await this.pool.query('select 1 as ok');
      this.logger.log('PostgreSQL connected');
    } catch (error: unknown) {
      this.logger.error(
        'Failed to connect to PostgreSQL.',
        error instanceof Error ? error.stack : String(error),
      );
      process.exit(1);
    }
  }

  // DB모듈 종료 이후
  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('PostgreSQL pool closed');
  }
}
