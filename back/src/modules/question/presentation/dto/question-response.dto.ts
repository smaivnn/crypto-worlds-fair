import { Expose, Type } from 'class-transformer';

export class QuestionChoiceDto {
  @Expose()
  id: string;

  @Expose()
  label: string;

  @Expose()
  sub?: string;
}

export class QuestionDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  subtitle?: string;

  @Expose()
  @Type(() => QuestionChoiceDto)
  choices: QuestionChoiceDto[];
}

export class QuestionSetResponseDto {
  @Expose()
  version: string;

  @Expose()
  locale: 'en' | 'ko';

  @Expose()
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
