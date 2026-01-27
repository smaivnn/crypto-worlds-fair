import { Desire } from './desire.entity';

export type BdsmDirection =
  | 'dominance'
  | 'submission'
  | 'switch'
  | 'brat'
  | 'brat-tamer'
  | 'sadist'
  | 'masochist'
  | 'bondage'
  | 'primal'
  | 'caregiver'
  | 'pet'
  | 'voyeur'
  | 'exhibitionist'
  | 'ritual'
  | 'explorer';

export type BdsmVisibility = 'free' | 'paid';

export type BdsmConfidence = 'high' | 'medium' | 'low';

export type BdsmTendencyCopy = {
  label: { en: string; ko: string };
  rationale?: { en?: string; ko?: string };
  detail?: { en?: string; ko?: string };
};

export type BdsmTendencyDefinition = {
  key: string;
  direction?: BdsmDirection;
  copy: BdsmTendencyCopy;
  visibility?: BdsmVisibility;
  confidence?: BdsmConfidence;
  tags?: string[];
};

export type BdsmPrimaryFallbackMap = Record<Desire, BdsmTendencyDefinition[]>;

export type BdsmPairMap = Partial<
  Record<Desire, Partial<Record<Desire, BdsmTendencyDefinition[]>>>
>;

export type BdsmTendencySelection = {
  primary: Desire;
  secondary: Desire;
  items: BdsmTendencyDefinition[];
  source: 'pair' | 'primary';
};
