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

export function emptyScore(): ScoreMap {
  return Object.fromEntries(DESIRES.map((d) => [d, 0])) as ScoreMap;
}
