import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { CorsConfig } from '../../config/cors.config';

export const createCorsOptions = (
  configService: ConfigService,
): CorsOptions => {
  const corsConfig = configService.get<CorsConfig>('cors', { infer: true });

  return {
    origin: corsConfig?.originList,
    methods: corsConfig?.methods,
    allowedHeaders: corsConfig?.allowedHeaders,
    credentials: corsConfig?.credentials,
  };
};
