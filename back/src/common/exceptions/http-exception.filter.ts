import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../core/logger/logger.service';

type NormalizedError = {
  statusCode: number;
  code: string;
  message: string;
  error: string;
};

/**
 * 다양한 형태의 message 값을 사람이 읽을 수 있는 문자열로 정규화한다.
 *
 * NestJS 기본 예외나 ValidationPipe에서는
 * message가 string | string[] | unknown 형태로 내려올 수 있다.
 *
 * - string[] 인 경우: 여러 메시지를 하나의 문자열로 합친다.
 * - string 인 경우: 그대로 사용한다.
 * - 그 외 타입: message 없음으로 간주한다.
 *
 * 이 함수의 목적은
 * "응답/로그에서 message는 항상 string 이다"라는 규칙을 보장하는 것이다.
 */
function normalizeMessage(message: unknown): string | undefined {
  if (Array.isArray(message)) return message.filter(Boolean).join(', ');
  if (typeof message === 'string') return message;
  return undefined;
}
/**
 * 어떤 형태의 예외든 공통 에러 응답 포맷으로 변환한다.
 *
 * 처리 규칙:
 * 1) HttpException (NestJS 표준 예외)
 *    - statusCode: exception.getStatus()
 *    - code:
 *        - response.code가 있으면 사용
 *        - 없으면 Exception 클래스 이름 사용
 *    - message:
 *        - response.message → normalizeMessage 적용
 *        - 없으면 exception.message
 *    - error: response.error 또는 exception.name
 *
 * 2) 일반 Error (프레임워크 외부 에러, 런타임 에러 등)
 *    - statusCode: 500
 *    - code: INTERNAL_SERVER_ERROR
 *    - message:
 *        - production 환경에서는 내부 메시지 노출 방지
 *        - development 환경에서는 실제 에러 메시지 노출
 *
 * 3) 그 외 알 수 없는 값 (throw string / throw object 등)
 *    - 완전히 안전한 기본 500 에러로 처리
 */
function normalizeException(exception: unknown): NormalizedError {
  if (exception instanceof HttpException) {
    const statusCode = exception.getStatus();
    const response = exception.getResponse();
    const responseObj =
      typeof response === 'string'
        ? { message: response }
        : (response as Record<string, any>) || {};

    return {
      statusCode,
      code: responseObj.code ?? exception.name,
      message:
        normalizeMessage(responseObj.message) ??
        exception.message ??
        'Internal server error',
      error: responseObj.error ?? exception.name,
    };
  }

  if (exception instanceof Error) {
    const isProd = process.env.NODE_ENV === 'production';
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: isProd
        ? 'Internal server error'
        : exception.message || 'Internal server error',
      error: exception.name || 'Error',
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    error: 'Error',
  };
}

@Catch() // 모든 예외 처리 필터로 등록
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    // http context 전화 (http 요청/응답 객체 접근)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const normalized = normalizeException(exception);

    const traceId =
      (request.headers['x-request-id'] as string) ||
      (request.headers['x-correlation-id'] as string) ||
      undefined;

    // 공통 응답 바디
    const responseBody = {
      statusCode: normalized.statusCode,
      success: false,
      code: normalized.code,
      message: normalized.message,
      error: normalized.error,
      traceId,
    };

    // 로깅 바디
    const logBody = {
      ...responseBody,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      stack:
        exception instanceof Error
          ? exception.stack
          : 'No stack trace available',
    };

    // Todo: 추후 ELK등 로그 분석 시스템 연동 시, <string, object> 형태로 로그 전송 필요한지 다시 확인
    this.logger.error(JSON.stringify(logBody));

    // 유저 반환
    response.status(normalized.statusCode).json(responseBody);
  }
}
