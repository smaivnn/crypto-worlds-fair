import { Injectable } from '@nestjs/common';
import { ComputeResultOutput } from './compute-result.use-case';
import { getDesireLabel, ScoreMap } from '../domain/desire.entity';
import { FREE_BLOCKS_KO, type FreeBlocks } from '../domain/free/free-blocks.ko';
import { FREE_BLOCKS_EN } from '../domain/free/free-blocks.en';

export type FreeResultCopy = {
  summaryCard: {
    mainDesire: string;
    subDesire: string;
    userQuote: string;
    engineLine: string;
    styleLine: string;
    tags: string[];
  };
  structure: { lines: string[] };
  trigger: { lines: string[] };
  illusion: { lines: string[] };
  intimacy: { lines: string[] };
  paywallCTA: string;
};

/**
 * 문장 변주 선택 규칙 (Deterministic Variant Picking)
 *
 * - v1/v2/v3 중 "랜덤"이 아니라 "결정적 선택"을 사용한다.
 * - 같은 입력(profile + answers)이라면 새로고침/재방문에도 동일한 문장이 나온다.
 * - 섹션별로(sectionId) seed를 분리해서,
 *   summary/structure/trigger/illusion/intimacy/paywall이 각각 다른 v를 가질 수 있다.
 *
 * 절차:
 * 1) userKey = hash(profile + answers)  // 유저의 입력을 대표하는 키
 * 2) seed   = hash(userKey + primary + secondary + sectionId)
 * 3) idx    = seed % variants.length
 * 4) pick   = variants[idx]
 */
@Injectable()
export class BuildFreeResultUseCase {
  execute(input: {
    computed: ComputeResultOutput;
    profile: any;
    answers: Record<string, string>;
  }): FreeResultCopy {
    const { computed, profile, answers } = input;

    const primaryKey = computed.primary.key as keyof ScoreMap;
    const secondaryKey = computed.secondary.key as keyof ScoreMap;

    // 1) seed (결정적 선택)
    const answersKey = this.normalizeAnswers(answers);
    const userKey = this.hashString(
      JSON.stringify({
        birthDate: profile?.birthDate,
        birthTime: profile?.birthTime ?? null,
        birthPlace: profile?.birthPlace ?? null,
        answers: answersKey,
      }),
    );

    const seedFor = (sectionId: string) =>
      this.hashString(`${userKey}|${primaryKey}|${secondaryKey}|${sectionId}`);

    const blocks = this.getBlocks({ locale: computed.locale });

    const pick = <T>(arr: T[], seed: number): T => {
      if (!arr || arr.length === 0) {
        throw new Error('Empty variant array');
      }
      return arr[seed % arr.length];
    };

    const vSummary = seedFor('summary');
    const vStructure = seedFor('structure');
    const vTrigger = seedFor('trigger');
    const vIllusion = seedFor('illusion');
    const vIntimacy = seedFor('intimacy');
    const vPaywall = seedFor('paywall');
    const vTags = seedFor('tags');

    const labelFor = (key: keyof ScoreMap) =>
      getDesireLabel(key, computed.locale);

    const primary = blocks.byDesire[primaryKey];
    const secondary = blocks.byDesire[secondaryKey];
    if (!primary || !secondary) {
      throw new Error(
        `Missing desire blocks: primary=${String(primaryKey)} secondary=${String(secondaryKey)}`,
      );
    }
    const paywallCTA = pick(blocks.paywallCTA, vPaywall);

    return {
      summaryCard: {
        mainDesire: labelFor(primaryKey),
        subDesire: labelFor(secondaryKey),
        userQuote: primary.userQuote ?? '',
        engineLine: pick(primary.primary.summaryEngine, vSummary),
        styleLine: pick(secondary.secondary.summaryStyle, vSummary),
        tags: this.buildTags({
          primary,
          secondary,
          vTags,
        }),
      },
      structure: {
        lines: [
          pick(primary.primary.structureBase, vStructure),
          pick(secondary.secondary.structureStyle, vStructure),
        ],
      },
      trigger: { lines: pick(primary.trigger, vTrigger) },
      illusion: { lines: pick(primary.illusion, vIllusion) },
      intimacy: {
        lines: [
          pick(primary.primary.intimacyBase, vIntimacy),
          pick(secondary.secondary.intimacyStyle, vIntimacy),
        ],
      },
      paywallCTA,
    };
  }

  private hashString(input: string): number {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  private normalizeAnswers(answers: Record<string, string>): string {
    return Object.entries(answers ?? {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([qid, cid]) => `${qid}=${cid}`)
      .join('|');
  }

  private buildTags(args: {
    primary: any;
    secondary: any;
    vTags: number;
  }): string[] {
    const { primary, secondary, vTags } = args;

    const rotate = (arr: string[], n: number) => {
      if (!arr || arr.length === 0) return [];
      const k = n % arr.length;
      return arr.slice(k).concat(arr.slice(0, k));
    };

    const p = rotate(primary.tagsPrimary ?? [], vTags).slice(0, 3);
    const s = rotate(secondary.tagsSecondary ?? [], vTags).slice(0, 1);
    const r = rotate(primary.riskTags ?? [], vTags).slice(0, 1);

    const out = [...p, ...s, ...r].filter(Boolean);
    return Array.from(new Set(out)).slice(0, 5);
  }

  private getBlocks({ locale }: { locale: 'en' | 'ko' }): FreeBlocks {
    if (locale === 'ko') {
      return FREE_BLOCKS_KO;
    }
    return FREE_BLOCKS_EN;
  }
}
