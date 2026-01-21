import { Controller, Get, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetQuestionSetUseCase } from '../application/get-question-set.use-case';
import { QuestionSetResponseDto } from './dto/question-response.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly getQuestionSetUseCase: GetQuestionSetUseCase) {}
  @Get('')
  async getQuestions(
    @Query('v') version = 'v1',
    @Query('locale') locale: 'en' | 'ko' = 'en',
  ) {
    const questionSet = await this.getQuestionSetUseCase.execute({
      version,
      locale,
    });
    if (!questionSet) {
      return null;
    }

    return plainToInstance(
      QuestionSetResponseDto,
      {
        version: questionSet.version,
        locale: questionSet.locale,
        questions: questionSet.questions,
      },
      { excludeExtraneousValues: true },
    );
  }
}
