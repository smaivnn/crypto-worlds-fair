import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseConfig } from 'src/config/database.config';
import { PG_POOL } from './pg.constants';

export const PgPoolProvider: Provider = {
  provide: PG_POOL,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const dbConfig = configService.getOrThrow<DatabaseConfig['pg']>(
      'database.pg',
      { infer: true },
    );

    /**
     * max: Pool이 동시에 열 수 있는 최대 DB커넥션 수
     * - 개발/소규모 서비스: 10~20
     * - 중간 규모: 20~50
     * - 대규모: 앱 서버수 * (5~10)
     *
     * idelTimeoutMillis: 노는 쿼리 커넥션을 지정한 시간 후에 Pool에서 제거 (ms)
     * - 보통 10~60초
     *
     * connectionTimeoutMillis: Pool에서 커넥션을 못구했을 때 얼마나 기다렸다가 실패할지(ms)
     * - 이미 max만큼 커넥션이 꽉 찼거나, DB가 느림/장애 상태일 때
     * - 1~3초 권장
     */
    return new Pool({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,

      // 운영 가면 보통 추가하는 옵션(선택)
      max: dbConfig.max ?? 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    });
  },
};
