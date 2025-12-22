import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AllConfigType } from 'src/config/config.type';

/**
 * 요청 빈도 제한 모듈
 * 라우트별로 다른 정책이 필요할 경우
 * 덮어쓰기: @Throttle({default: { limit: number, ttl: number }})
 * 건너뛰기: @SkipThrottle({default: boolean}), default 객체 옵션은 생략할 수 있음
 * - 예시: 컨트롤러에 @SkipThrottle()를 붙이면 해당 컨트롤러의 모든 라우트는 레이트 리미터 적용 안 함
 * - 예시: 특정 라우트에 @SkipThrottle({ default: false })를 붙이면 해당 라우트는 레이트 리미터 적용
 *
 * 참고: https://docs.nestjs.com/security/rate-limiting
 *
 * Todo: 앞 단에 NGINX, Cloudflare, ELB 같은 리버스 프록시가 있는 경우, ip는 모두 앞단의 ip로 찍히기 때문에 이 경우 프록시 환경 설정 추가 필요
 */
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const throttlerConfig = configService.getOrThrow('throttler', {
          infer: true,
        });

        /**
         * 기본 전역 레이트리미트 정책 1개 설정
         *
         * name: 정책 식별자(없으면 default)
         * ttl : 제한 시간(ms 단위)
         * limit: ttl 동안 허용 가능한 요청 횟수
         */
        return [
          {
            ttl: throttlerConfig.ttl,
            limit: throttlerConfig.limit,
          },
        ];
      },
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class RateLimiterModule {}
