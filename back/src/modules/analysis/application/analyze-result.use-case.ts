import { Injectable } from '@nestjs/common';
import {
  ComputeResultOutput,
  ComputeResultUseCase,
} from './compute-result.use-case';
import {
  BuildFreeResultUseCase,
  FreeResultCopy,
} from './build-free-result.use-case';
import { GetQuestionSetUseCase } from '@/modules/question/application/get-question-set.use-case';

export type AnalyzeResultInput = {
  profile: any;
  answers: Record<string, string>;
  version?: string;
  locale?: 'en' | 'ko';
};

export type AnalyzeResultOutput = ComputeResultOutput & {
  copy: FreeResultCopy;
};

@Injectable()
export class AnalyzeResultUseCase {
  constructor(
    private readonly getQuestionSetUseCase: GetQuestionSetUseCase,
    private readonly computeResultUseCase: ComputeResultUseCase,
    private readonly buildFreeResultUseCase: BuildFreeResultUseCase,
  ) {}
  // AnalyzeResultOutput
  async execute(input: AnalyzeResultInput): Promise<any> {
    const version = input.version ?? 'v1';
    const locale = input.locale ?? 'en';

    // 1) 질문셋 로딩(백엔드가 소스 오브 트루스)
    const questionSet = await this.getQuestionSetUseCase.execute({
      version,
      locale,
    });

    // 2) 점수 계산 + 1/2위 선정 (순수 계산 유스케이스)
    const computedRaw = await this.computeResultUseCase.execute({
      profile: input.profile,
      answers: input.answers,
      version,
      locale,
      questionSet,
    });

    const computed: ComputeResultOutput = {
      ...computedRaw,
      version,
      locale,
    };

    // 3) 무료 카피/응답 구성
    const copy = this.buildFreeResultUseCase.execute({
      computed,
      profile: input.profile,
      answers: input.answers,
    });

    return {
      //   ...computed,
      copy,
    };
  }
}
