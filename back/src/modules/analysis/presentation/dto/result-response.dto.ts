import { Expose, Type } from 'class-transformer';

export type DesireKey =
  | 'SOVEREIGN'
  | 'ANCHOR'
  | 'GUARDIAN'
  | 'WITNESS'
  | 'MERGER'
  | 'DEVOTEE'
  | 'SEEKER'
  | 'REBELLION'
  | 'NOMAD'
  | 'SPECTATOR'
  | 'CURATOR'
  | 'ASCENDER';

export class ResultTypeDto {
  @Expose() key!: DesireKey;
}

export class ResultCopySummaryCardDto {
  @Expose() title!: string; // e.g. "SOVEREIGN (주권형)" or just "SOVEREIGN"
  @Expose() symbol!: string; // e.g. "왕관"
  @Expose() userQuote!: string; // 유저 노출 문장
  @Expose() engineLine!: string; // primary.summaryEngine (picked)
  @Expose() styleLine!: string; // secondary.summaryStyle (picked)
  @Expose() tags!: string[]; // ["Control", "Stability", ...] 같은 짧은 태그
}

export class ResultCopySectionDto {
  @Expose() lines!: string[]; // 섹션별 3~4줄 문장
}

export class ResultCopyDto {
  @Expose()
  @Type(() => ResultCopySummaryCardDto)
  summaryCard!: ResultCopySummaryCardDto;

  @Expose()
  @Type(() => ResultCopySectionDto)
  structure!: ResultCopySectionDto;

  @Expose()
  @Type(() => ResultCopySectionDto)
  trigger!: ResultCopySectionDto;

  @Expose()
  @Type(() => ResultCopySectionDto)
  illusion!: ResultCopySectionDto;

  @Expose()
  @Type(() => ResultCopySectionDto)
  intimacy!: ResultCopySectionDto;

  @Expose() paywallCTA!: string; // 고정/3종 중 1개
}

export class ResultTendencyItemDto {
  @Expose() key!: string;
  @Expose() direction?: string;
  @Expose() visibility!: 'free' | 'paid';
  @Expose() confidence!: 'high' | 'medium';
  @Expose() label!: string;
  @Expose() rationale?: string;
  @Expose() detail?: string;
  @Expose() tags?: string[];
}

export class ResultTendencyDto {
  @Expose() primary!: DesireKey;
  @Expose() secondary!: DesireKey;
  @Expose() source!: 'pair' | 'primary';

  @Expose()
  @Type(() => ResultTendencyItemDto)
  items!: ResultTendencyItemDto[];
}

export class ComputeResultResponseDto {
  @Expose() version!: string;
  @Expose() locale!: 'en' | 'ko';

  @Expose()
  @Type(() => ResultTypeDto)
  primary!: ResultTypeDto;

  @Expose()
  @Type(() => ResultTypeDto)
  secondary!: ResultTypeDto;

  @Expose()
  @Type(() => ResultCopyDto)
  copy!: ResultCopyDto;

  @Expose()
  @Type(() => ResultTendencyDto)
  tendency!: ResultTendencyDto;
}
