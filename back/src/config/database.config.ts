import { registerAs } from '@nestjs/config';
import { parseBool } from 'src/utils/parse.util';

export type DbClientType = 'postgres' | 'something-else';

export type PGConfig = {
  client: DbClientType;
  url?: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  max?: number;
  ssl?: boolean;
  sslRejectUnauthorized?: boolean;
};

export type somethingElseConfig = {
  // 다른 디비 설정
};

export type DatabaseConfig = {
  pg: PGConfig;
  somethingElse?: somethingElseConfig;
};

export default registerAs<DatabaseConfig>('database', () => ({
  pg: {
    client: 'postgres',
    url: process.env.PG_DB_URL ?? process.env.PG_DATABASE_URL,
    host: process.env.PG_DB_HOST ?? 'localhost',
    port: Number(process.env.PG_DB_PORT ?? 5432),
    user: process.env.PG_DB_USER ?? 'dev',
    password: process.env.PG_DB_PASSWORD ?? 'devpass',
    database: process.env.PG_DB_NAME ?? 'devdb',
    // Supabase pooler는 TLS가 필요하므로 SSL on/off와 검증 여부를 env로 제어
    ssl: parseBool({ value: process.env.PG_DB_SSL, fallback: false }),
    sslRejectUnauthorized: parseBool({
      value: process.env.PG_DB_SSL_REJECT_UNAUTHORIZED,
      fallback: true,
    }),
  },
  somethingElse: {
    // 다른 디비 설정
  },
}));
