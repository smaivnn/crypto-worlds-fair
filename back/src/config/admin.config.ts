import { registerAs } from '@nestjs/config';

export type AdminConfig = {
  user: string;
  password: string;
};

export default registerAs('admin', () => ({
  user: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_PASSWORD || '1234',
}));
