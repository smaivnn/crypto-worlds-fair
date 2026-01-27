import type { BdsmPairMap } from './bdsm-tendency';

export const BDSM_PAIR_MAP: BdsmPairMap = {
  SOVEREIGN: {
    DEVOTEE: [
      {
        key: 'dominance',
        direction: 'dominance',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Dominant', ko: '지배 성향' },
          rationale: {
            ko: '주도권(주도자)과 바침/순응(신봉자)이 맞물리면 역할 구조가 가장 또렷하게 잡힙니다.',
          },
        },
      },
      {
        key: 'service-sub',
        direction: 'submission',
        confidence: 'high',
        visibility: 'paid',
        copy: {
          label: { en: 'Service Submissive', ko: '헌신·복종 성향' },
          rationale: {
            ko: '관계의 균형이 “결정하는 쪽”과 “기꺼이 따르는 쪽”으로 정렬될수록 욕망이 안정적으로 유지됩니다.',
          },
        },
      },
    ],

    WITNESS: [
      {
        key: 'power-play',
        direction: 'dominance',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Power Play Oriented', ko: '권력 플레이 지향' },
          rationale: {
            ko: '주도자는 흐름을 만들고, 반응주의자는 반응으로 확신을 얻기 때문에 “주도→반응” 루프가 강합니다.',
          },
        },
      },
      {
        key: 'exhibitionist-adjacent',
        direction: 'exhibitionist',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: {
            en: 'Display / Feedback Driven',
            ko: '노출·피드백 중심 성향',
          },
          rationale: {
            ko: '보여짐과 피드백이 욕망의 스위치가 되면서, 관계 안에서 연출·확인이 자연스럽게 강화됩니다.',
          },
        },
      },
    ],

    REBELLION: [
      {
        key: 'brat-tension',
        direction: 'brat-tamer',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Brat–Tamer Tension', ko: '브랫–테이머 긴장' },
          rationale: {
            ko: '주도자는 통제하려 하고 반항자는 저항하려 해서, 권력의 “팽팽함” 자체가 욕망을 끌어올립니다.',
          },
        },
      },
      {
        key: 'edge-play-inclined',
        direction: 'primal',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Edge / Boundary Tension', ko: '경계 긴장 지향' },
          rationale: {
            ko: '금기와 경계 넘기(반항)의 성향이 주도자의 통제 욕구와 결합하면 긴장도가 높아지기 쉽습니다.',
          },
        },
      },
    ],
  },

  ANCHOR: {
    MERGER: [
      {
        key: 'possessive-attachment',
        direction: 'bondage',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Exclusive Attachment', ko: '독점·애착 결속' },
          rationale: {
            ko: '정착자의 안정/지속 욕구와 결속자의 융합 욕구가 만나면 “떠나지 않는 관계”가 핵심 조건이 됩니다.',
          },
        },
      },
      {
        key: 'emotional-bondage',
        direction: 'bondage',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Emotional Bondage', ko: '정서 결박 성향' },
          rationale: {
            ko: '관계의 밀도를 높일수록 욕망이 안정되며, 감정적 고정이 강해지는 경향이 있습니다.',
          },
        },
      },
    ],

    GUARDIAN: [
      {
        key: 'bonded-care',
        direction: 'caregiver',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Bonded Care Dynamic', ko: '고정·보호 관계' },
          rationale: {
            ko: '정착자는 틀을 만들고, 수호자는 그 틀을 지키며 관리해 “안정된 보호 관계”가 자연스럽게 형성됩니다.',
          },
        },
      },
      {
        key: 'protection-oriented',
        direction: 'caregiver',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Protection-Oriented Play', ko: '보호 중심 성향' },
          rationale: {
            ko: '안전과 책임의 합의가 명확할수록 욕망이 편안하게 유지됩니다.',
          },
        },
      },
    ],
  },

  GUARDIAN: {
    DEVOTEE: [
      {
        key: 'caregiver-dependent',
        direction: 'caregiver',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Caregiver–Dependent', ko: '케어기버–의존' },
          rationale: {
            ko: '수호자의 책임/보호와 신봉자의 헌신/의존이 결합하면 역할이 빠르게 정렬되는 편입니다.',
          },
        },
      },
      {
        key: 'service-bond',
        direction: 'submission',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Service Bond', ko: '헌신 결속' },
          rationale: {
            ko: '돌봄을 “행동”으로 주고받을수록 친밀감이 깊어지고, 관계가 더 단단해집니다.',
          },
        },
      },
    ],

    SPECTATOR: [
      {
        key: 'safe-distance-guard',
        direction: 'voyeur',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Safe Distance Control', ko: '안전거리 관리형' },
          rationale: {
            ko: '수호자는 리스크를 관리하고, 방관자는 거리를 유지하려 해 “안전거리”가 규칙처럼 작동합니다.',
          },
        },
      },
      {
        key: 'structured-safety',
        direction: 'ritual',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Structured Safety', ko: '안전 규칙 중심' },
          rationale: {
            ko: '접근/거리/신호 같은 약속이 촘촘할수록 안정감이 커집니다.',
          },
        },
      },
    ],
  },

  WITNESS: {
    SOVEREIGN: [
      {
        key: 'reaction-dominance-loop',
        direction: 'exhibitionist',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Reaction–Control Loop', ko: '반응–주도 루프' },
          rationale: {
            ko: '반응주의자는 피드백으로 욕망이 켜지고, 주도자는 그 피드백을 “만들어내는” 쪽이라 서로 강화됩니다.',
          },
        },
      },
    ],

    CURATOR: [
      {
        key: 'structured-attention',
        direction: 'exhibitionist',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Structured Attention', ko: '구조화된 시선' },
          rationale: {
            ko: '해석자의 맥락/규칙이 반응주의자의 “보여짐”을 정교하게 만들며, 반응이 더 선명해집니다.',
          },
        },
      },
      {
        key: 'ritual-display',
        direction: 'ritual',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Ritualized Display', ko: '의식화된 연출' },
          rationale: {
            ko: '정해진 흐름(프로토콜) 안에서 연출과 피드백이 교환되면 욕망이 오래 유지됩니다.',
          },
        },
      },
    ],
  },

  MERGER: {
    DEVOTEE: [
      {
        key: 'devotion-fusion',
        direction: 'submission',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Devotion & Fusion', ko: '헌신·융합형' },
          rationale: {
            ko: '결속자는 깊게 엮일수록 살아나고, 신봉자는 바칠수록 살아나 “깊은 몰입”이 핵심이 됩니다.',
          },
        },
      },
      {
        key: 'attachment-play',
        direction: 'bondage',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Attachment Driven', ko: '강한 애착 플레이' },
          rationale: {
            ko: '관계의 밀도와 “우리” 감각이 욕망의 강도를 결정하는 편입니다.',
          },
        },
      },
    ],

    ANCHOR: [
      {
        key: 'exclusive-bond',
        direction: 'bondage',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Exclusive Bond', ko: '독점 결속' },
          rationale: {
            ko: '결속의 깊이(결속자)와 지속성(정착자)이 함께 오면 관계의 “고정성”이 강해집니다.',
          },
        },
      },
    ],
  },

  SEEKER: {
    ASCENDER: [
      {
        key: 'intensity-exploration',
        direction: 'explorer',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Intensity Exploration', ko: '강도·탐색 조합' },
          rationale: {
            ko: '탐구자는 새로움을 찾고, 중독자는 강도를 올리려 해 “실험→상승” 흐름이 자연스럽게 이어집니다.',
          },
        },
      },
      {
        key: 'experimental-play',
        direction: 'explorer',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Experimental Play', ko: '실험 성향' },
          rationale: {
            ko: '변화와 확장이 멈추면 욕망도 금방 식는 편이라, 새 자극을 설계하는 쪽으로 기울 수 있습니다.',
          },
        },
      },
    ],

    NOMAD: [
      {
        key: 'open-exploration',
        direction: 'explorer',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Open Exploration', ko: '열린 탐색형' },
          rationale: {
            ko: '방랑자의 자유(비고정)와 탐구자의 새로움 욕구가 만나면, 고정 없는 탐색이 편안해집니다.',
          },
        },
      },
    ],
  },

  ASCENDER: {
    REBELLION: [
      {
        key: 'edge-taboo',
        direction: 'sadist',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Edge / Taboo Inclined', ko: '경계·금기 지향' },
          rationale: {
            ko: '중독자의 “더 강하게”와 반항자의 “경계를 넘기”가 결합하면 긴장도가 빠르게 올라갈 수 있습니다.',
          },
        },
      },
      {
        key: 'limit-expansion',
        direction: 'masochist',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Limit Expansion', ko: '한계 확장 성향' },
          rationale: {
            ko: '스스로의 경계를 시험하며 단계적으로 강도를 올리는 흐름이 나타날 수 있습니다.',
          },
        },
      },
    ],
  },

  NOMAD: {
    SPECTATOR: [
      {
        key: 'distance-observation',
        direction: 'voyeur',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Distance Observation', ko: '거리 관찰형' },
          rationale: {
            ko: '방랑자는 얽힘을 줄일수록 편하고, 방관자는 관찰 거리가 있어야 욕망이 안전해져 “거리 유지”가 핵심이 됩니다.',
          },
        },
      },
      {
        key: 'non-possessive',
        direction: 'switch',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Non-Possessive Dynamic', ko: '비독점 성향' },
          rationale: {
            ko: '관계의 출구가 열려 있다는 확신이 있을수록 더 자연스럽게 반응할 수 있습니다.',
          },
        },
      },
    ],

    SEEKER: [
      {
        key: 'free-explorer',
        direction: 'explorer',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Free Explorer', ko: '자유 탐색형' },
          rationale: {
            ko: '새로움(탐구)과 비고정(방랑)이 결합하면, 실험이 부담이 아니라 “호흡”처럼 됩니다.',
          },
        },
      },
    ],
  },

  CURATOR: {
    DEVOTEE: [
      {
        key: 'protocol-service',
        direction: 'ritual',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Protocol + Service', ko: '프로토콜·헌신 조합' },
          rationale: {
            ko: '해석자는 맥락/룰을 만들고, 신봉자는 그 틀 안에서 바칠 때 가장 편해져 “규칙 있는 헌신”이 강합니다.',
          },
        },
      },
      {
        key: 'protocol-driven',
        direction: 'ritual',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Protocol Driven', ko: '룰 중심 성향' },
          rationale: {
            ko: '의미와 합의가 선명할수록 욕망이 안정적으로 유지됩니다.',
          },
        },
      },
    ],

    WITNESS: [
      {
        key: 'structured-display',
        direction: 'exhibitionist',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Structured Display', ko: '구조화된 연출' },
          rationale: {
            ko: '연출(해석)과 반응(반응주의)이 결합하면 “보여짐의 디테일”이 욕망을 더 오래 붙잡습니다.',
          },
        },
      },
    ],
  },

  SPECTATOR: {
    NOMAD: [
      {
        key: 'detached-voyeur',
        direction: 'voyeur',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Detached Voyeur', ko: '거리 관음형' },
          rationale: {
            ko: '방관자의 관찰과 방랑자의 비고정이 만나면, 직접 개입보다 “거리에서의 자극”이 편해집니다.',
          },
        },
      },
    ],
  },

  DEVOTEE: {
    SOVEREIGN: [
      {
        key: 'service-sub',
        direction: 'submission',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Service Submissive', ko: '헌신·복종 성향' },
          rationale: {
            ko: '신봉자는 “바치는 구조”에서 가장 안정되고, 주도자는 “결정하는 구조”에서 가장 또렷해져 역할이 빠르게 정렬됩니다.',
          },
        },
      },
      {
        key: 'protocol-service',
        direction: 'ritual',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Protocol + Service', ko: '프로토콜·헌신 조합' },
          rationale: {
            ko: '합의된 규칙/의식이 있을수록 헌신이 더 깊어지고, 관계가 ‘의미 있는 구조’로 고정됩니다.',
          },
        },
      },
    ],

    MERGER: [
      {
        key: 'devotion-fusion',
        direction: 'submission',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Devotion & Fusion', ko: '헌신·융합형' },
          rationale: {
            ko: '결속의 밀도(결속자) + 바침의 에너지(신봉자)가 만나면 “깊게 엮이는 방식”이 욕망을 가장 잘 살립니다.',
          },
        },
      },
      {
        key: 'attachment-play',
        direction: 'bondage',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Attachment Driven', ko: '강한 애착 플레이' },
          rationale: {
            ko: '서로의 관계를 “확실히 붙잡는 감각”이 있을수록 욕망이 오래 지속됩니다.',
          },
        },
      },
    ],
  },

  REBELLION: {
    SOVEREIGN: [
      {
        key: 'brat-tension',
        direction: 'brat-tamer',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Brat–Tamer Tension', ko: '브랫–테이머 긴장' },
          rationale: {
            ko: '반항은 ‘저항’으로 긴장을 만들고, 주도는 ‘통제’로 긴장을 다뤄서 권력의 팽팽함이 핵심 연료가 됩니다.',
          },
        },
      },
      {
        key: 'power-play',
        direction: 'dominance',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Power Play Oriented', ko: '권력 플레이 지향' },
          rationale: {
            ko: '정해진 역할을 거부하면서도, 역할의 긴장 자체는 더 강하게 원하게 되는 역설이 생길 수 있습니다.',
          },
        },
      },
    ],

    ASCENDER: [
      {
        key: 'edge-taboo',
        direction: 'sadist',
        confidence: 'high',
        visibility: 'free',
        copy: {
          label: { en: 'Edge / Taboo Inclined', ko: '경계·금기 지향' },
          rationale: {
            ko: '반항은 금기를 넘고, 중독은 강도를 올려서 “경계가 계속 확장되는 흐름”이 자연스럽게 만들어집니다.',
          },
        },
      },
      {
        key: 'limit-expansion',
        direction: 'masochist',
        confidence: 'medium',
        visibility: 'paid',
        copy: {
          label: { en: 'Limit Expansion', ko: '한계 확장 성향' },
          rationale: {
            ko: '긴장과 강도를 단계적으로 올릴수록 만족이 커지는 패턴으로 이어질 수 있습니다.',
          },
        },
      },
    ],
  },
};
