import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule, InfraModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
