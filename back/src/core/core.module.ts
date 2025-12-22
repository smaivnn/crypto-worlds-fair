import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { HttpClientModule } from './http-client/http-client.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import adminConfig from 'src/config/admin.config';
import corsConfig from 'src/config/cors.config';
import throttlerConfig from 'src/config/throttler.config';
import databaseConfig from 'src/config/database.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        corsConfig,
        adminConfig,
        throttlerConfig,
        databaseConfig,
      ],
    }),
    HttpClientModule,
    LoggerModule,
  ],
  exports: [HttpClientModule],
})
export class CoreModule {}
