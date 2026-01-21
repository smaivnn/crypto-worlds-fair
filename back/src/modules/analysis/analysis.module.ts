import { Module } from '@nestjs/common';
import { AnalysisController } from './presentation/analysis.controller';
import { QuestionModule } from '../question/question.module';
import { AnalyzeResultUseCase } from './application/analyze-result.use-case';
import { ComputeResultUseCase } from './application/compute-result.use-case';
import { BuildFreeResultUseCase } from './application/build-free-result.use-case';

@Module({
  controllers: [AnalysisController],
  imports: [QuestionModule],
  providers: [
    AnalyzeResultUseCase,
    ComputeResultUseCase,
    BuildFreeResultUseCase,
  ],
  exports: [],
})
export class AnalysisModule {}
