import { registerAs } from '@nestjs/config';
import { parseBool } from 'src/utils/parse.util';

export type CorsConfig = {
  originList: string[];
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
};

export default registerAs('cors', () => {
  const originList = process.env.CORS_ORIGIN_LIST
    ? process.env.CORS_ORIGIN_LIST.split(',').map((o) => o.trim())
    : ['*'];

  const allowedHeaders = process.env.CORS_ALLOWED_HEADERS
    ? process.env.CORS_ALLOWED_HEADERS.split(',').map((h) => h.trim())
    : undefined;

  const credentials = parseBool({
    value: process.env.CORS_CREDENTIALS,
    fallback: true,
  });

  const methods = process.env.CORS_METHODS
    ? process.env.CORS_METHODS
    : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  return { originList, allowedHeaders, credentials, methods };
});
