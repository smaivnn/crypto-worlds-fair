import type { BdsmPrimaryFallbackMap } from './bdsm-tendency';

export const BDSM_PRIMARY_FALLBACKS: BdsmPrimaryFallbackMap = {
  SOVEREIGN: [
    {
      key: 'dominant',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Dominant', ko: '지배 성향' },
        rationale: {
          ko: '주도권과 통제를 쥘 때 욕망의 에너지가 가장 또렷해집니다.',
        },
      },
    },
    {
      key: 'power-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Power Play Oriented', ko: '권력 플레이 지향' },
        rationale: {
          ko: '명확한 역할과 위계가 있을수록 관계의 긴장이 살아납니다.',
        },
      },
    },
  ],

  ANCHOR: [
    {
      key: 'possessive',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Possessive Dynamic', ko: '소유 기반 성향' },
        rationale: {
          ko: '안정된 소속과 독점성이 욕망을 오래 유지시킵니다.',
        },
      },
    },
    {
      key: 'bonded',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Bonded Relationship Play', ko: '관계 고정형 플레이' },
        rationale: {
          ko: '관계가 흔들리지 않을수록 욕망이 깊어집니다.',
        },
      },
    },
  ],

  GUARDIAN: [
    {
      key: 'caregiver',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Caregiver Dynamic', ko: '케어기버 성향' },
        rationale: {
          ko: '지키고 돌보는 역할에서 친밀한 욕망이 발생합니다.',
        },
      },
    },
    {
      key: 'protector-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Protection-Oriented Play', ko: '보호·의존 플레이' },
        rationale: {
          ko: '안전과 책임이 명확할수록 욕망이 작동합니다.',
        },
      },
    },
  ],

  WITNESS: [
    {
      key: 'reaction-junkie',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Reaction Driven', ko: '반응 중독형' },
        rationale: {
          ko: '상대의 표정과 반응이 욕망의 스위치가 됩니다.',
        },
      },
    },
    {
      key: 'attention-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Attention Focused', ko: '시선·피드백 중심 성향' },
        rationale: {
          ko: '보여지고 반응받을 때 욕망이 증폭됩니다.',
        },
      },
    },
  ],

  MERGER: [
    {
      key: 'emotional-bondage',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Emotional Bondage', ko: '정서 융합형' },
        rationale: {
          ko: '깊게 엮일수록 욕망이 강해지는 타입입니다.',
        },
      },
    },
    {
      key: 'attachment-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Attachment Driven', ko: '강한 애착 플레이' },
        rationale: {
          ko: '관계의 밀도가 욕망의 강도를 결정합니다.',
        },
      },
    },
  ],

  DEVOTEE: [
    {
      key: 'service-sub',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Service Submissive', ko: '헌신·복종 성향' },
        rationale: {
          ko: '바치고 순응하는 과정에서 만족을 느낍니다.',
        },
      },
    },
    {
      key: 'devotion-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Devotion Oriented', ko: '헌신 기반 플레이' },
        rationale: {
          ko: '상대에게 의미 있게 쓰일 때 욕망이 활성화됩니다.',
        },
      },
    },
  ],

  SEEKER: [
    {
      key: 'sensation-seeker',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Sensation Seeker', ko: '센세이션 추구형' },
        rationale: {
          ko: '새롭고 강한 자극이 욕망을 유지시킵니다.',
        },
      },
    },
    {
      key: 'experimental-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Experimental Play', ko: '자극 실험 성향' },
        rationale: {
          ko: '변화와 탐색이 멈추면 욕망도 식습니다.',
        },
      },
    },
  ],

  REBELLION: [
    {
      key: 'taboo-play',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Taboo Oriented', ko: '금기 플레이 성향' },
        rationale: {
          ko: '금지된 선택에서 강한 흥분이 발생합니다.',
        },
      },
    },
    {
      key: 'edge-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Edge Play Inclined', ko: '경계 넘기 지향' },
        rationale: {
          ko: '위험과 긴장이 욕망을 자극합니다.',
        },
      },
    },
  ],

  NOMAD: [
    {
      key: 'non-possessive',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Non-Possessive Dynamic', ko: '비독점 성향' },
        rationale: {
          ko: '자유가 보장될수록 욕망이 유지됩니다.',
        },
      },
    },
    {
      key: 'open-dynamic',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Open Dynamic', ko: '열린 관계 지향' },
        rationale: {
          ko: '머무르지 않을 선택지가 욕망을 살립니다.',
        },
      },
    },
  ],

  SPECTATOR: [
    {
      key: 'voyeuristic',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Voyeuristic Inclination', ko: '관음 성향' },
        rationale: {
          ko: '거리와 관찰이 욕망을 안전하게 유지합니다.',
        },
      },
    },
    {
      key: 'detached-play',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Detached Observation', ko: '거리 유지 플레이' },
        rationale: {
          ko: '직접 개입하지 않을 때 흥분이 발생합니다.',
        },
      },
    },
  ],

  CURATOR: [
    {
      key: 'ritual-play',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Ritual Oriented', ko: '의식·구조 플레이 성향' },
        rationale: {
          ko: '맥락과 규칙이 욕망의 핵심입니다.',
        },
      },
    },
    {
      key: 'protocol-driven',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Protocol Driven', ko: '룰 중심 성향' },
        rationale: {
          ko: '의미 없는 접촉에는 욕망이 생기지 않습니다.',
        },
      },
    },
  ],

  ASCENDER: [
    {
      key: 'intensity-driven',
      confidence: 'high',
      visibility: 'free',
      copy: {
        label: { en: 'Intensity Driven', ko: '강도 상승형' },
        rationale: {
          ko: '점점 강해져야 욕망이 만족됩니다.',
        },
      },
    },
    {
      key: 'limit-expansion',
      confidence: 'medium',
      visibility: 'paid',
      copy: {
        label: { en: 'Limit Expansion', ko: '한계 확장 플레이' },
        rationale: {
          ko: '경계를 넘는 과정에서 중독성이 생깁니다.',
        },
      },
    },
  ],
};
