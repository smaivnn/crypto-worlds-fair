import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import * as DailyRotate from 'winston-daily-rotate-file';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

/**
 * Todo:
 * 추후 엑세스 로그는 간략하게 변경 가능, 에러 단계를 좀 더 상세하게 나누는 방향 고려
 * 예: info - 일반 로그, warn - 잠재적 문제, error - 심각한 문제
 * 예: 429 레이트리미트는 warn정도로 로그 남기기 등
 */
@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: WinstonLogger;

  constructor(private readonly configService: ConfigService) {
    // 로그 디렉토리 생성 (없을 경우)
    const logDir = path.resolve(__dirname, '../../../../logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    //  개발 환경 확인
    const nodeEnv = this.configService.get<string>('app.nodeEnv', {
      infer: true,
    });
    const isProd = nodeEnv === 'production';

    // 공통 포맷 (파일, 콘솔 공통)
    const baseFormat = format.combine(
      // 타임스탬프 추가
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

      // 메타데이터가 있는 경우, JSON 문자열로 변환
      format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaString}`;
      }),
    );

    // 개발 환경용 포맷 (컬러 포함)
    const devConsoleFormat = format.combine(
      format.colorize(),
      format.timestamp({ format: 'HH:mm:ss' }),
      format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length
          ? ' ' + JSON.stringify(meta)
          : '';
        return `[${timestamp}] [${level}] ${message}${metaString}`;
      }),
    );

    // Winston logger 생성
    this.logger = createLogger({
      level: isProd ? 'info' : 'debug', // 로그 레벨 우선 순위: error < warn < info < http < verbose < debug < silly
      format: baseFormat,

      // 로그를 어디로 출력할지 설정(라이브: 콘솔, 개발: 콘솔)
      // - Railway는 컨테이너 파일이 영구 보관되지 않아 파일 로그가 유지되지 않음
      // - 운영에서도 stdout(콘솔)로 출력해야 Railway Logs 탭에서 확인 가능
      transports: isProd
        ? // 라이브 환경
          [
            new transports.Console({
              format: devConsoleFormat,
            }),
            // 파일 로그는 Railway 환경에서 유지되지 않아 임시로 비활성화
            // new DailyRotate({
            //   filename: path.join(logDir, 'error-%DATE%.log'),
            //   datePattern: 'YYYY-MM-DD',
            //   level: 'error',
            //   zippedArchive: true, // .gz 파일로 압축
            //   maxSize: '20m',
            //   maxFiles: '14d', // 14일치 로그 파일 보관(선택)
            // }),
            // new DailyRotate({
            //   filename: path.join(logDir, 'app-%DATE%.log'),
            //   datePattern: 'YYYY-MM-DD',
            //   zippedArchive: true, // .gz 파일로 압축
            //   maxSize: '20m',
            //   maxFiles: '14d', // 14일치 로그 파일 보관(선택)
            // }),
          ]
        : // 개발 환경
          [
            new transports.Console({
              format: devConsoleFormat,
            }),
          ],
      // 예외/미처리 Promise 로깅(필요 시 주석 해제)
      // exceptionHandlers: isProd ? [new transports.File({ filename: path.join(logDir, 'exceptions.log') })] : [],
      // rejectionHandlers: isProd ? [new transports.File({ filename: path.join(logDir, 'rejections.log') })] : [],
    });
  }

  // Todo: 추후 ELK등 로그 분석 시스템 연동 시, <string, object> 형태로 로그 전송 필요한지 다시 확인
  // Todo: 바꾼다면 error(message: string, meta?: Record<string, any>)이런식으로 바꾸면 됨
  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace ? { trace } : {});
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
