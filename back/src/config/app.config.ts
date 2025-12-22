import { registerAs } from '@nestjs/config';

export type AppConfig = {
  nodeEnv: string;
  port: number;
  domain: string;
};

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  domain: process.env.DOMAIN || 'http://localhost',
}));
