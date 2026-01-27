import type { Desire } from '@/modules/analysis/domain/desire.entity';

// ===============================
// Public (API response) types
// ===============================
export type PublicChoice = { id: string; label: string; sub?: string };
export type PublicQuestion = {
  id: string;
  title: string;
  subtitle?: string;
  choices: PublicChoice[];
};
export type PublicQuestionSet = {
  version: string;
  locale: 'en' | 'ko';
  questions: PublicQuestion[];
};

// ===============================
// Internal (analysis scoring) types
// ===============================
export type InternalChoice = PublicChoice & {
  score: Partial<Record<Desire, number>>;
};
export type InternalQuestion = Omit<PublicQuestion, 'choices'> & {
  choices: InternalChoice[];
};
export type InternalQuestionSet = Omit<PublicQuestionSet, 'questions'> & {
  questions: InternalQuestion[];
};

export const QUESTION_SET_V1_EN: InternalQuestionSet = {
  version: 'v1',
  locale: 'en',
  questions: [
    {
      id: 'q1',
      title: 'When no one assigns you a role, how do you usually start moving?',
      subtitle:
        'Choose what you tend to do naturally, even without being asked.',
      choices: [
        {
          id: 'a',
          label: 'I organize the flow and set a direction',
          sub: 'Someone has to decide, so I set the standard',
          score: { SOVEREIGN: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: 'I read the room and watch the timing',
          sub: 'Before stepping in, I observe people and the atmosphere',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: 'I test the waters and check reactions',
          sub: 'A small move or comment to feel the response',
          score: { WITNESS: 3, SEEKER: 1 },
        },
        {
          id: 'd',
          label: 'I don’t stay inside the situation',
          sub: 'I naturally think about other exits or options',
          score: { NOMAD: 3, REBELLION: 1 },
        },
      ],
    },

    {
      id: 'q2',
      title:
        'When an awkward silence falls between people, how does your body usually react?',
      subtitle:
        'Go with your instinctive reaction, before thinking it through.',
      choices: [
        {
          id: 'a',
          label: 'I speak up first',
          sub: 'Leaving a gap feels more uncomfortable',
          score: { WITNESS: 3, SOVEREIGN: 1 },
        },
        {
          id: 'b',
          label: 'I quietly observe',
          sub: 'It feels like a moment to watch rather than act',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: 'I throw in a stimulus to shift the mood',
          sub: 'A joke or an unexpected move',
          score: { SEEKER: 3, REBELLION: 1 },
        },
        {
          id: 'd',
          label: 'I feel fine stepping away',
          sub: 'I don’t feel the need to endure it',
          score: { NOMAD: 3, ANCHOR: 1 },
        },
      ],
    },

    {
      id: 'q3',
      title:
        'If someone asks you, “Could you take on this role?”, what’s your first thought?',
      subtitle: 'This reflects how you naturally respond to responsibility.',
      choices: [
        {
          id: 'a',
          label: 'Does that come with decision-making authority?',
          sub: 'Responsibility should come with control',
          score: { SOVEREIGN: 3, ASCENDER: 1 },
        },
        {
          id: 'b',
          label: 'Someone has to do it, so I will',
          sub: 'It feels necessary to hold things together',
          score: { GUARDIAN: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: 'The structure probably needs fixing first',
          sub: 'This won’t last in its current form',
          score: { CURATOR: 3, ANCHOR: 1 },
        },
        {
          id: 'd',
          label: 'Is there another option altogether?',
          sub: 'I think about changing the whole setup',
          score: { REBELLION: 3, NOMAD: 1 },
        },
      ],
    },

    {
      id: 'q4',
      title:
        'When discomfort starts to build in a relationship, what feeling comes first?',
      subtitle: 'This emotion usually drives your next move.',
      choices: [
        {
          id: 'a',
          label: 'Feeling less important',
          sub: 'A sense of being pushed away from the center',
          score: { WITNESS: 3, SOVEREIGN: 1 },
        },
        {
          id: 'b',
          label: 'Anxiety from broken patterns',
          sub: 'The predictable flow starts to crack',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: 'A sense of drifting apart',
          sub: 'Loosening bonds hurt the most',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'd',
          label: 'Frustration, feeling trapped',
          sub: 'The closer it gets, the less room I feel',
          score: { NOMAD: 3, SPECTATOR: 1 },
        },
      ],
    },

    {
      id: 'q5',
      title:
        'If your entire schedule suddenly gets canceled, what do you most want to do?',
      subtitle: 'Not what you should do — what actually pulls you.',
      choices: [
        {
          id: 'a',
          label: 'Create a completely new scene',
          sub: 'Change the place, people, or sensations',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'b',
          label: 'Organize and return to a steady routine',
          sub: 'Order brings calm',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: 'Make sense of things',
          sub: 'Writing or structuring my thoughts',
          score: { CURATOR: 3, SPECTATOR: 1 },
        },
        {
          id: 'd',
          label: 'Dive deeply into one thing',
          sub: 'A person or a task — full immersion',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
      ],
    },

    {
      id: 'q6',
      title:
        'If someone says to you, “Do you really need to go that far?”, what do you think?',
      choices: [
        {
          id: 'a',
          label: 'That makes me want to do it even more',
          sub: 'Limits and prohibitions spark desire',
          score: { REBELLION: 3, SEEKER: 1 },
        },
        {
          id: 'b',
          label: 'It’s important enough to deserve that effort',
          sub: 'Meaning raises my standards',
          score: { DEVOTEE: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: 'This is the way I decided to do it',
          sub: 'I dislike my standards being shaken',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'd',
          label: 'The structure itself is the problem',
          sub: 'It’s not about people, it’s about the system',
          score: { CURATOR: 3, REBELLION: 1 },
        },
      ],
    },

    {
      id: 'q7',
      title: 'What kind of compliment stays with you the longest?',
      subtitle: 'The kind you still remember after time passes.',
      choices: [
        {
          id: 'a',
          label: '“Things felt stable because of you.”',
          sub: 'Being the one who held things together',
          score: { GUARDIAN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: '“You keep leveling up.”',
          sub: 'Recognition of growth and ascent',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '“I felt truly seen by you.”',
          sub: 'Being accurately recognized',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: '“You’re someone who goes all the way.”',
          sub: 'Acknowledgment of devotion and commitment',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
      ],
    },

    {
      id: 'q8',
      title:
        'When your interest in something starts fading, what’s usually the reason?',
      choices: [
        {
          id: 'a',
          label: 'Growth feels stalled',
          sub: 'The sense of moving forward disappears',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: 'The stimulation is gone',
          sub: 'Without novelty, it fades quickly',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'c',
          label: 'The relationship stops deepening',
          sub: 'No longer mixing or merging',
          score: { MERGER: 3, SPECTATOR: 1 },
        },
        {
          id: 'd',
          label: 'Feeling constrained',
          sub: 'When options disappear, I pull away',
          score: { NOMAD: 3, ANCHOR: 1 },
        },
      ],
    },

    {
      id: 'q9',
      title:
        'When you think about being truly absorbed in something, which feeling is closest?',
      subtitle: 'Choose the word that pulls you most.',
      choices: [
        {
          id: 'a',
          label: 'Stability',
          sub: 'A solid base and steady rhythm',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'b',
          label: 'Ascent',
          sub: 'A constant sense of leveling up',
          score: { ASCENDER: 3, SOVEREIGN: 1 },
        },
        {
          id: 'c',
          label: 'Bonding',
          sub: 'Being firmly connected to someone or something',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'd',
          label: 'Stimulation',
          sub: 'Sharp, new sensations that hit first',
          score: { SEEKER: 3, REBELLION: 1 },
        },
      ],
    },
  ],
} as const;

// ===============================
// v1 KO (final candidate)
// 자연스러운 문장 + 덜 예측 가능한 장면 기반 질문
// ===============================
export const QUESTION_SET_V1_KO: InternalQuestionSet = {
  version: 'v1',
  locale: 'ko',
  questions: [
    {
      id: 'q1',
      title:
        '아무도 당신에게 역할을 정해주지 않은 상황에서, 당신은 보통 어떻게 움직이나요?',
      subtitle: '누가 시키지 않아도 자연스럽게 하게 되는 쪽을 골라주세요.',
      choices: [
        {
          id: 'a',
          label: '흐름을 정리하고 방향을 잡는다',
          sub: '누군가는 정해야 해서, 내가 기준을 세워요',
          score: { SOVEREIGN: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: '분위기를 읽으며 타이밍을 본다',
          sub: '들어가기 전, 사람들과 공기를 먼저 살펴요',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '작게 던져보고 반응을 확인한다',
          sub: '한마디, 한 행동으로 분위기를 느껴봐요',
          score: { WITNESS: 3, SEEKER: 1 },
        },
        {
          id: 'd',
          label: '굳이 안에 머물지 않는다',
          sub: '다른 선택지나 출구를 자연스럽게 떠올려요',
          score: { NOMAD: 3, REBELLION: 1 },
        },
      ],
    },
    {
      id: 'q2',
      title:
        '사람들 사이에서 어색한 침묵이 흐를 때, 당신의 몸은 보통 어떻게 반응하나요?',
      subtitle: '머리로 생각하기 전에 먼저 나오는 반응에 가깝게.',
      choices: [
        {
          id: 'a',
          label: '내가 먼저 말을 꺼낸다',
          sub: '공백을 두는 게 더 불편해요',
          score: { WITNESS: 3, SOVEREIGN: 1 },
        },
        {
          id: 'b',
          label: '조용히 관찰한다',
          sub: '지금은 보는 게 맞다고 느껴요',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '분위기를 바꿀 자극을 던진다',
          sub: '농담이나 변칙적인 한 수',
          score: { SEEKER: 3, REBELLION: 1 },
        },
        {
          id: 'd',
          label: '자리를 벗어나도 괜찮다고 느낀다',
          sub: '굳이 버틸 필요는 없어요',
          score: { NOMAD: 3, ANCHOR: 1 },
        },
      ],
    },

    {
      id: 'q3',
      title:
        '사람들이 당신에게 “이 역할을 맡아줄 수 있겠어?”라고 말한다면, 가장 먼저 드는 생각은?',
      subtitle: '책임을 대하는 당신의 기본 반응에 가깝습니다.',
      choices: [
        {
          id: 'a',
          label: '그럼 결정권도 함께 있는 건가?',
          sub: '책임엔 권한이 따라야 한다고 느껴요',
          score: { SOVEREIGN: 3, ASCENDER: 1 },
        },
        {
          id: 'b',
          label: '누군가는 해야 하니까, 내가 한다',
          sub: '버텨주는 사람이 필요하다고 느껴요',
          score: { GUARDIAN: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: '구조부터 다시 짜야 할 것 같다',
          sub: '이 상태로는 오래 못 가요',
          score: { CURATOR: 3, ANCHOR: 1 },
        },
        {
          id: 'd',
          label: '이 역할 말고 다른 선택지는 없을까?',
          sub: '판 자체를 바꾸는 쪽이 먼저 떠올라요',
          score: { REBELLION: 3, NOMAD: 1 },
        },
      ],
    },

    {
      id: 'q4',
      title:
        '관계에서 불편함이 쌓이기 시작할 때, 당신이 가장 먼저 느끼는 감정은?',
      subtitle: '보통 이 감정이 행동을 결정합니다.',
      choices: [
        {
          id: 'a',
          label: '내가 덜 중요해진 것 같은 느낌',
          sub: '중심에서 밀려나는 감각',
          score: { WITNESS: 3, SOVEREIGN: 1 },
        },
        {
          id: 'b',
          label: '패턴이 깨진 불안',
          sub: '예측 가능했던 흐름이 어긋난 느낌',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: '우리가 멀어지는 느낌',
          sub: '결속이 느슨해지는 감각이 가장 아파요',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'd',
          label: '답답함, 숨 막힘',
          sub: '가까워질수록 나갈 곳이 없어요',
          score: { NOMAD: 3, SPECTATOR: 1 },
        },
      ],
    },

    {
      id: 'q5',
      title: '갑자기 하루 일정이 전부 취소됐다면, 당신이 가장 하고 싶은 건?',
      subtitle: '의무 말고, 진짜 끌리는 쪽을 고르세요.',
      choices: [
        {
          id: 'a',
          label: '완전히 새로운 장면을 만든다',
          sub: '장소, 사람, 감각을 바꾸고 싶어요',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'b',
          label: '일정 정리하고 안정적인 루틴을 만든다',
          sub: '정돈되면 마음이 풀려요',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: '의미를 정리한다',
          sub: '기록하거나 생각을 구조화해요',
          score: { CURATOR: 3, SPECTATOR: 1 },
        },
        {
          id: 'd',
          label: '하나의 대상에 깊게 빠진다',
          sub: '사람이든 일이든, 몰입하고 싶어요',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
      ],
    },

    {
      id: 'q6',
      title:
        '누군가 당신에게 “굳이 그렇게까지 해야 해?”라고 말한다면, 속으로 드는 생각은?',
      choices: [
        {
          id: 'a',
          label: '그래서 더 하고 싶어진다',
          sub: '금지나 제약은 오히려 불을 붙여요',
          score: { REBELLION: 3, SEEKER: 1 },
        },
        {
          id: 'b',
          label: '그만큼 중요하니까 하는 거다',
          sub: '의미 있는 일에는 기준이 높아져요',
          score: { DEVOTEE: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '이건 내가 정한 방식이다',
          sub: '내 기준이 흔들리는 게 싫어요',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'd',
          label: '지금 이 구조가 문제다',
          sub: '사람보다 판이 잘못됐다고 느껴요',
          score: { CURATOR: 3, REBELLION: 1 },
        },
      ],
    },

    {
      id: 'q7',
      title: '당신이 오래 기억하는 칭찬은 어떤 종류인가요?',
      subtitle: '시간이 지나도 남아 있는 말.',
      choices: [
        {
          id: 'a',
          label: '“너 덕분에 중심이 잡혔어”',
          sub: '내가 판을 지탱했다는 말',
          score: { GUARDIAN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: '“너는 계속 올라가네”',
          sub: '성장과 상승을 알아봐 주는 말',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '“너를 제대로 본 느낌이야”',
          sub: '정확히 봐줬다는 말',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: '“끝까지 가는 사람인 것 같아”',
          sub: '몰입과 헌신을 인정받는 말',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
      ],
    },

    {
      id: 'q8',
      title: '무언가에 마음이 식기 시작할 때, 가장 큰 이유는 무엇인가요?',
      choices: [
        {
          id: 'a',
          label: '성장이 멈춘 느낌',
          sub: '앞으로 나아간다는 감각이 사라질 때',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: '자극이 사라질 때',
          sub: '새로움이 없으면 금방 꺼져요',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'c',
          label: '관계의 깊이가 멈출 때',
          sub: '더 이상 섞이지 않는 느낌',
          score: { MERGER: 3, SPECTATOR: 1 },
        },
        {
          id: 'd',
          label: '묶여 있다는 감각',
          sub: '선택지가 사라지면 멀어져요',
          score: { NOMAD: 3, ANCHOR: 1 },
        },
      ],
    },
    {
      id: 'q9',
      title:
        '당신이 무언가에 ‘진짜로’ 빠져들 때를 떠올리면, 그 상태는 어떤 느낌에 가까운가요?',
      subtitle: '가장 끌리는 한 단어를 골라주세요.',
      choices: [
        {
          id: 'a',
          label: '안정',
          sub: '흔들리지 않는 루틴과 확실한 기반이 있을 때',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'b',
          label: '상승',
          sub: '레벨이 오르고 있다는 감각이 계속 나를 밀어올릴 때',
          score: { ASCENDER: 3, SOVEREIGN: 1 },
        },
        {
          id: 'c',
          label: '결속',
          sub: '누군가/무언가와 단단히 이어져 있다는 확신이 생길 때',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'd',
          label: '자극',
          sub: '새롭고 날카로운 감각이 들어오면서 심장이 먼저 반응할 때',
          score: { SEEKER: 3, REBELLION: 1 },
        },
      ],
    },
  ],
} as const;

// ===============================
// Helper: strip scoring for public API response
// ===============================
export function toPublicQuestionSet(
  set: InternalQuestionSet,
): PublicQuestionSet {
  return {
    version: set.version,
    locale: set.locale,
    questions: set.questions.map((q) => ({
      id: q.id,
      title: q.title,
      subtitle: q.subtitle,
      choices: q.choices.map((c) => ({
        id: c.id,
        label: c.label,
        sub: c.sub,
      })),
    })),
  };
}
