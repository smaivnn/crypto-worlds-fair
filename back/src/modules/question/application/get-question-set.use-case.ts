import { Injectable } from '@nestjs/common';
import { QUESTION_SET_V1_EN } from '../domain/question-v1.entity';

@Injectable()
export class GetQuestionSetUseCase {
  async execute({
    version,
    locale,
  }: {
    version?: string;
    locale?: 'en' | 'ko';
  }) {
    const questionSets = {
      v1: {
        en: QUESTION_SET_V1_EN,
        // ko: QUESTION_SET_V1_KO,
      },
    };

    const selectedVersion = version && questionSets[version] ? version : 'v1';
    const selectedLocale =
      locale && questionSets[selectedVersion][locale] ? locale : 'en';
    if (!questionSets[selectedVersion][selectedLocale]) {
      return null;
    }

    return questionSets[selectedVersion][selectedLocale];
  }
}
