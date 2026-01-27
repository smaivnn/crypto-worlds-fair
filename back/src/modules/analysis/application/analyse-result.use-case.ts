import { Injectable } from '@nestjs/common';
import {
  ComputeResultOutput,
  ComputeResultUseCase,
} from './compute-result.use-case';
import {
  BuildFreeResultUseCase,
  FreeResultCopy,
} from './build-free-result.use-case';
import { BuildBdsmTendencyUseCase } from './build-bdsm-tendency.use-case';
import { Desire } from '../domain/desire.entity';
import { GetQuestionSetUseCase } from '@/modules/question/application/get-question-set.use-case';

export type AnalyseResultInput = {
  profile: any;
  answers: Record<string, string>;
  version?: string;
  locale?: 'en' | 'ko';
};

export type AnalyseResultOutput = {
  version: string;
  locale: 'en' | 'ko';
  primary: { key: Desire };
  secondary: { key: Desire };
  copy: FreeResultCopy;
  tendency: ReturnType<BuildBdsmTendencyUseCase['execute']>;
};

@Injectable()
export class AnalyseResultUseCase {
  constructor(
    private readonly getQuestionSetUseCase: GetQuestionSetUseCase,
    private readonly computeResultUseCase: ComputeResultUseCase,
    private readonly buildFreeResultUseCase: BuildFreeResultUseCase,
    private readonly buildBdsmTendencyUseCase: BuildBdsmTendencyUseCase,
  ) {}
  // AnalyseResultOutput
  async execute(input: AnalyseResultInput): Promise<AnalyseResultOutput> {
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

    // 4) BDSM 성향 구성
    const tendency = this.buildBdsmTendencyUseCase.execute({
      primary: computed.primary.key as Desire,
      secondary: computed.secondary.key as Desire,
      locale,
      access: 'free',
    });

    return {
      version,
      locale,
      primary: { key: computed.primary.key },
      secondary: { key: computed.secondary.key },
      copy,
      tendency,
    };
  }
}
