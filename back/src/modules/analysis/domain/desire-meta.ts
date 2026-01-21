import { Desire } from './desire.entity';

export type DesireMeta = {
  symbolKey: string;
  symbolLabel: string;
};

export const DESIRE_META: Record<Desire, DesireMeta> = {
  SOVEREIGN: { symbolKey: 'pillar', symbolLabel: '기둥' },
  ANCHOR: { symbolKey: 'anchor', symbolLabel: '닻' },
  GUARDIAN: { symbolKey: 'shield', symbolLabel: '방패' },
  WITNESS: { symbolKey: 'spotlight', symbolLabel: '스포트라이트' },
  MERGER: { symbolKey: 'overlap', symbolLabel: '교차 원' },
  DEVOTEE: { symbolKey: 'altar', symbolLabel: '제단' },
  SEEKER: { symbolKey: 'arrow', symbolLabel: '화살표' },
  REBELLION: { symbolKey: 'crack', symbolLabel: '균열' },
  NOMAD: { symbolKey: 'openCircle', symbolLabel: '열린 원' },
  SPECTATOR: { symbolKey: 'frame', symbolLabel: '프레임' },
  CURATOR: { symbolKey: 'layers', symbolLabel: '레이어' },
  ASCENDER: { symbolKey: 'steps', symbolLabel: '계단' },
};
