import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      // 요청 처리 시간 로깅 등 부가 작업 처리
      tap(() => {
        const ms = Date.now() - now;
        this.logger.log(`[${request.method}] ${request.url} - ${ms}ms`);
      }),
      // 응답 데이터 가공
      map((data) => {
        const statusCode = response.statusCode || 200;
        return {
          statusCode,
          success: true,
          data,
        };
      }),
    );
  }
}
