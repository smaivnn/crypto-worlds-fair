import { Module, Global } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { RateLimiterModule } from './rate-limiter/rate-limiter.module';

@Global()
@Module({
  imports: [DatabaseModule, RateLimiterModule],
  exports: [DatabaseModule],
})
export class InfraModule {}
