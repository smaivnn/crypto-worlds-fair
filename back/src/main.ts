import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import validationOptions from './utils/validation-options';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './core/logger/logger.service';
import { serveFrontend } from './utils/serve-frontend.util';
import { createCorsOptions } from './common/cors/cors-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AllConfigType>>(ConfigService);
  const logger = app.get<LoggerService>(LoggerService);

  // CORS 설정
  const corsOptions = createCorsOptions(configService);
  app.enableCors(corsOptions);

  // 글로벌 prefix 설정
  app.setGlobalPrefix('api');

  // 글로벌 파이프 설정 (DTO validation)
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // 글로벌 필터 설정 (exceptions)
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // 글로벌 인터셉터 설정 (logging, 응답 가공 등)
  app.useGlobalInterceptors(new ResponseInterceptor(logger));

  // Todo: (있을 경우, api 프리픽스 어떻게되는지 확인) 정적 파일 & 프론트 파일 서빙 설정
  serveFrontend(app);

  // 서버 시작
  const port = configService.getOrThrow('app.port', { infer: true });
  const domain = configService.getOrThrow('app.domain', { infer: true });
  try {
    await app.listen(port, () => {
      logger.log(`Application is running on: ${domain}:${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1); // 비정상 종료
  }
}

bootstrap();
