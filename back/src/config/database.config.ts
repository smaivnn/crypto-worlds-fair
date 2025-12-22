import { registerAs } from '@nestjs/config';

export type DbClientType = 'postgres' | 'something-else';

export type PGConfig = {
  client: DbClientType;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
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
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? 'dev',
    password: process.env.DB_PASSWORD ?? 'devpass',
    database: process.env.DB_NAME ?? 'devdb',
  },
  somethingElse: {
    // 다른 디비 설정
  },
}));
