import { Module } from '@nestjs/common';
import { AnalysisController } from './presentation/analysis.controller';
import { QuestionModule } from '../question/question.module';
import { AnalyseResultUseCase } from './application/analyse-result.use-case';
import { ComputeResultUseCase } from './application/compute-result.use-case';
import { BuildFreeResultUseCase } from './application/build-free-result.use-case';
import { BuildBdsmTendencyUseCase } from './application/build-bdsm-tendency.use-case';
import { ShareResultUseCase } from './application/share-result.use-case';
import { GetShareResultUseCase } from './application/get-share-result.use-case';
import { AddAnalysisSessionRepository } from './domain/repositories/add-analysis-session.repository';
import { AddAnalysisShareRepository } from './domain/repositories/add-analysis-share.repository';
import { GetAnalysisShareRepository } from './domain/repositories/get-analysis-share.repository';
import { FindAnalysisShareRepository } from './domain/repositories/find-analysis-share.repository';
import { AddAnalysisSessionPostgresRepository } from './infrastructure/add-analysis-session-pg.repository';
import { AddAnalysisSharePostgresRepository } from './infrastructure/add-analysis-share-pg.repository';
import { GetAnalysisSharePostgresRepository } from './infrastructure/get-analysis-share-pg.repository';
import { FindAnalysisSharePostgresRepository } from './infrastructure/find-analysis-share-pg.repository';

@Module({
  controllers: [AnalysisController],
  imports: [QuestionModule],
  providers: [
    AnalyseResultUseCase,
    ComputeResultUseCase,
    BuildFreeResultUseCase,
    BuildBdsmTendencyUseCase,
    ShareResultUseCase,
    GetShareResultUseCase,
    {
      provide: AddAnalysisSessionRepository,
      useClass: AddAnalysisSessionPostgresRepository,
    },
    {
      provide: AddAnalysisShareRepository,
      useClass: AddAnalysisSharePostgresRepository,
    },
    {
      provide: GetAnalysisShareRepository,
      useClass: GetAnalysisSharePostgresRepository,
    },
    {
      provide: FindAnalysisShareRepository,
      useClass: FindAnalysisSharePostgresRepository,
    },
  ],
  exports: [],
})
export class AnalysisModule {}
