import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [CoreModule, InfraModule, AnalysisModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
