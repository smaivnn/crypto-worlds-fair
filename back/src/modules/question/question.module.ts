import { Module } from '@nestjs/common';
import { GetQuestionSetUseCase } from './application/get-question-set.use-case';
import { QuestionController } from './presentation/question.controller';

@Module({
  controllers: [QuestionController],
  imports: [],
  providers: [GetQuestionSetUseCase],
  exports: [GetQuestionSetUseCase],
})
export class QuestionModule {}
