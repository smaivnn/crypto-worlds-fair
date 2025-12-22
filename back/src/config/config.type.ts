import { AdminConfig } from './admin.config';
import { AppConfig } from './app.config';
import { CorsConfig } from './cors.config';
import { DatabaseConfig } from './database.config';
import { ThrottlerConfig } from './throttler.config';

export type AllConfigType = {
  app: AppConfig;
  cors: CorsConfig;
  admin: AdminConfig;
  throttler: ThrottlerConfig;
  database: DatabaseConfig;
};
