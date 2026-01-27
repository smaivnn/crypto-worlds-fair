export type Desire =
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

export const DESIRES: Desire[] = [
  'SOVEREIGN',
  'ANCHOR',
  'GUARDIAN',
  'WITNESS',
  'MERGER',
  'DEVOTEE',
  'SEEKER',
  'REBELLION',
  'NOMAD',
  'SPECTATOR',
  'CURATOR',
  'ASCENDER',
];

export type ScoreMap = Record<Desire, number>;

export const DESIRE_LABELS: Record<Desire, { en: string; ko: string }> = {
  SOVEREIGN: { en: 'SOVEREIGN', ko: '주도자' },
  ANCHOR: { en: 'ANCHOR', ko: '정착자' },
  GUARDIAN: { en: 'GUARDIAN', ko: '수호자' },
  WITNESS: { en: 'WITNESS', ko: '반응주의자' },
  MERGER: { en: 'MERGER', ko: '결속자' },
  DEVOTEE: { en: 'DEVOTEE', ko: '신봉자' },
  SEEKER: { en: 'SEEKER', ko: '탐구자' },
  REBELLION: { en: 'REBELLION', ko: '반항자' },
  NOMAD: { en: 'NOMAD', ko: '방랑자' },
  SPECTATOR: { en: 'SPECTATOR', ko: '방관자' },
  CURATOR: { en: 'CURATOR', ko: '해석자' },
  ASCENDER: { en: 'ASCENDER', ko: '중독자' },
};

/**
 * 다양한 “라벨 입력값”을 내부 Desire 키로 정규화하기 위한 lookup table.
 *
 * - 키(lookup input):
 *   1) Desire 키 자체 (예: 'SOVEREIGN')
 *   2) 영문 라벨 (labels.en)
 *   3) 한글 라벨 (labels.ko)
 * - 값(output): 해당 Desire 키
 *
 * 동작 방식:
 * - Object.entries(DESIRE_LABELS)로 [desireKey, {en, ko}]들을 순회
 * - 각 desireKey마다 3개의 엔트리를 만든 뒤(flatMap)
 * - Object.fromEntries로 하나의 객체(Record<string, Desire>)로 합칩니다.
 *
 * 예시:
 * - DESIRE_LABELS.SOVEREIGN = { en: 'SOVEREIGN', ko: '주도자' }
 *   => DESIRE_LABEL_TO_KEY['SOVEREIGN'] = 'SOVEREIGN'
 *   => DESIRE_LABEL_TO_KEY['주도자'] = 'SOVEREIGN'
 *
 * - DESIRE_LABELS.CURATOR = { en: 'CURATOR', ko: '해석자' }
 *   => DESIRE_LABEL_TO_KEY['CURATOR'] = 'CURATOR'
 *   => DESIRE_LABEL_TO_KEY['해석자'] = 'CURATOR'
 */
export const DESIRE_LABEL_TO_KEY: Record<string, Desire> = Object.fromEntries(
  Object.entries(DESIRE_LABELS).flatMap(([key, labels]) => [
    [key, key as Desire],
    [labels.en, key as Desire],
    [labels.ko, key as Desire],
  ]),
);

export function getDesireLabel(desire: Desire, locale: 'en' | 'ko'): string {
  return DESIRE_LABELS[desire]?.[locale] ?? String(desire);
}

export function resolveDesireKey(value: string): Desire | null {
  // 예: resolveDesireKey('주도자')   -> 'SOVEREIGN'
  // 예: resolveDesireKey('CURATOR')  -> 'CURATOR'
  // 예: resolveDesireKey('unknown')  -> null
  return DESIRE_LABEL_TO_KEY[value] ?? null;
}

export function emptyScore(): ScoreMap {
  return Object.fromEntries(DESIRES.map((d) => [d, 0])) as ScoreMap;
}
