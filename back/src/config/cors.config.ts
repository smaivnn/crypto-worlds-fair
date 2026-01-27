import { registerAs } from '@nestjs/config';
import { parseBool } from 'src/utils/parse.util';

export type CorsConfig = {
  originList: string[];
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  openAll?: boolean;
};

export default registerAs('cors', () => {
  const originList = process.env.CORS_ORIGIN_LIST
    ? process.env.CORS_ORIGIN_LIST.split(',').map((o) => o.trim())
    : [];

  const allowedHeaders = process.env.CORS_ALLOWED_HEADERS
    ? process.env.CORS_ALLOWED_HEADERS.split(',').map((h) => h.trim())
    : undefined;

  const credentials = parseBool({
    value: process.env.CORS_CREDENTIALS,
    fallback: false,
  });

  const openAll = parseBool({
    value: process.env.CORS_OPEN_ALL,
    fallback: false,
  });

  const methods = process.env.CORS_METHODS
    ? process.env.CORS_METHODS
    : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  return { originList, allowedHeaders, credentials, openAll, methods };
});
