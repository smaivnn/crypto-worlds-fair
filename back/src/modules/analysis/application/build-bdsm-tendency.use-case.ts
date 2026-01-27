import { Injectable } from '@nestjs/common';
import {
  BdsmConfidence,
  BdsmTendencyDefinition,
  BdsmVisibility,
} from '../domain/bdsm-tendency';
import { BDSM_PRIMARY_FALLBACKS } from '../domain/bdsm-tendency.base';
import { BDSM_PAIR_MAP } from '../domain/bdsm-tendency.pairs';
import { Desire } from '../domain/desire.entity';

// 로직 흐름:
// 1) primary/secondary 조합 맵에서 후보를 찾는다.
// 2) access 기준으로 visibility/confidence를 필터링한다.
// 3) 조합 후보가 있으면 pair 결과로 반환한다.
// 4) 없으면 primary fallback에서 필터링 후 반환한다.
// 5) label/rationale/detail은 locale 기준으로 변환한다.

export type BuildBdsmTendencyInput = {
  primary: Desire;
  secondary: Desire;
  locale: 'en' | 'ko';
  access?: 'free' | 'paid';
};

export type BdsmTendencyItem = {
  key: string;
  direction?: BdsmTendencyDefinition['direction'];
  visibility: BdsmVisibility;
  confidence: BdsmConfidence;
  label: string;
  rationale?: string;
  detail?: string;
  tags?: string[];
};

export type BuildBdsmTendencyOutput = {
  primary: Desire;
  secondary: Desire;
  source: 'pair' | 'primary';
  items: BdsmTendencyItem[];
};

@Injectable()
export class BuildBdsmTendencyUseCase {
  execute(input: BuildBdsmTendencyInput): BuildBdsmTendencyOutput {
    const access = input.access ?? 'free';
    const pairItems = BDSM_PAIR_MAP[input.primary]?.[input.secondary];
    const filteredPair = this.filterByAccess(pairItems, access);

    if (filteredPair.length > 0) {
      return {
        primary: input.primary,
        secondary: input.secondary,
        source: 'pair',
        items: filteredPair.map((item) => this.toLocalized(item, input.locale)),
      };
    }

    const fallbackItems = BDSM_PRIMARY_FALLBACKS[input.primary] ?? [];
    const filteredFallback = this.filterByAccess(fallbackItems, access);

    return {
      primary: input.primary,
      secondary: input.secondary,
      source: 'primary',
      items: filteredFallback.map((item) =>
        this.toLocalized(item, input.locale),
      ),
    };
  }

  private filterByAccess(
    items: BdsmTendencyDefinition[] | undefined,
    access: 'free' | 'paid',
  ): BdsmTendencyDefinition[] {
    // access 수준에 맞는 visibility/confidence만 남긴다.
    const allowedVisibility: BdsmVisibility[] =
      access === 'paid' ? ['free', 'paid'] : ['free'];
    const allowedConfidence: BdsmConfidence[] =
      access === 'paid' ? ['high', 'medium'] : ['high'];

    return (items ?? []).filter((item) => {
      const visibility = item.visibility ?? 'free';
      const confidence = item.confidence ?? 'high';
      return (
        allowedVisibility.includes(visibility) &&
        allowedConfidence.includes(confidence)
      );
    });
  }

  private toLocalized(
    item: BdsmTendencyDefinition,
    locale: 'en' | 'ko',
  ): BdsmTendencyItem {
    // locale에 맞는 label/rationale/detail을 선택해 응답용으로 변환한다.
    const label = item.copy.label[locale] ?? item.copy.label.en;
    const rationale =
      item.copy.rationale?.[locale] ?? item.copy.rationale?.en ?? undefined;
    const detail = item.copy.detail?.[locale] ?? item.copy.detail?.en;

    return {
      key: item.key,
      direction: item.direction,
      visibility: item.visibility ?? 'free',
      confidence: item.confidence ?? 'high',
      label,
      rationale,
      detail,
      tags: item.tags,
    };
  }
}
