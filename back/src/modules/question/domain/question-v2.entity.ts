// /src/modules/question/domain/question-v2.entity.ts
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

// ===============================
// v2 KO (internal, includes scoring)
// - v1보다 '장면/반응/촉발' 중심으로 설계 (덜 뻔하게)
// ===============================
export const QUESTION_SET_V2_KO: InternalQuestionSet = {
  version: 'v2',
  locale: 'ko',
  questions: [
    {
      id: 'q1',
      title:
        '낯선 모임에 들어갔을 때, 당신이 “먼저” 하는 행동에 가장 가까운 건?',
      subtitle: '예의나 이상적인 답 말고, 진짜 자동으로 몸이 가는 쪽.',
      choices: [
        {
          id: 'a',
          label: '자리를 잡고 프레임을 만든다',
          sub: '누가 주도하는지, 룰이 뭔지, 흐트러지지 않게 잡아요',
          score: { ANCHOR: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: '말없이 관찰하며 판을 읽는다',
          sub: '표정·거리·기류부터 파악하고, 들어갈 타이밍을 봐요',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '가벼운 자극을 던져 반응을 본다',
          sub: '한마디로 분위기를 흔들고, 누가 어떻게 반응하는지 봐요',
          score: { WITNESS: 3, SEEKER: 1 },
        },
        {
          id: 'd',
          label: '잠깐 빠져나가 ‘다른 출구’를 만든다',
          sub: '안에선 답이 안 보여요. 밖에서 루트를 다시 열어요',
          score: { NOMAD: 3, REBELLION: 1 },
        },
      ],
    },

    {
      id: 'q2',
      title: '상대가 의미심장한 말을 남기고 사라졌을 때, 당신의 머릿속은?',
      subtitle: '연락/관계에서 “불안”이 어디서 시작되는지 보는 질문이에요.',
      choices: [
        {
          id: 'a',
          label: '“지금 내가 주도권을 잃었나?”가 먼저 떠오른다',
          sub: '내가 상황을 쥐고 있는지부터 확인하고 싶어요',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: '“패턴이 깨졌네”가 먼저 걸린다',
          sub: '이전과 다르다면 이유가 있어요. 규칙이 무너진 느낌이 싫어요',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: '“나를 어떻게 보고 있지?”가 먼저 쿡 찌른다',
          sub: '시선·반응이 끊기면, 존재감이 같이 흐려져요',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: '“일단 거리 두자”가 먼저 작동한다',
          sub: '가까워질수록 위험할 때가 있어요. 한 발 빼고 보게 돼요',
          score: { SPECTATOR: 3, NOMAD: 1 },
        },
      ],
    },

    {
      id: 'q3',
      title: '사람들이 당신에게 “이 판을 맡아달라”고 요청한다면, 당신은?',
      subtitle: '불안정한 상황일수록 더 선명해져요.',
      choices: [
        {
          id: 'a',
          label: '일단 권한부터 확보한다',
          sub: '책임은 질 수 있어요. 대신 결정권이 있어야 해요',
          score: { SOVEREIGN: 3, ASCENDER: 1 },
        },
        {
          id: 'b',
          label: '내가 버팀목이 된다',
          sub: '누군가는 지켜야 하니까, 내가 그 역할을 해요',
          score: { GUARDIAN: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: '구조를 재설계한다',
          sub: '규칙과 기준을 다시 짜야 해결이 보여요',
          score: { CURATOR: 3, ANCHOR: 1 },
        },
        {
          id: 'd',
          label: '판 자체를 바꿀 방법을 찾는다',
          sub: '정면돌파보다, 게임을 갈아엎는 게 빠를 때가 있어요',
          score: { REBELLION: 3, NOMAD: 1 },
        },
      ],
    },

    {
      id: 'q4',
      title:
        '“내일이 완전히 비어 있다”는 걸 알았을 때, 가장 먼저 떠오르는 그림은?',
      subtitle: '휴식의 형태가 욕망의 형태랑 비슷해요.',
      choices: [
        {
          id: 'a',
          label: '낯선 장면을 찾는다',
          sub: '새로운 장소/사람/감각이 있어야 살아나요',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'b',
          label: '루틴을 정리하고 안정감을 만든다',
          sub: '정돈·정리·준비… 안정이 생기면 마음이 풀려요',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: '의미를 정리하는 시간을 갖는다',
          sub: '기록·정리·해석… ‘이게 뭐였지’가 풀려야 해요',
          score: { CURATOR: 3, SPECTATOR: 1 },
        },
        {
          id: 'd',
          label: '깊게 엮일 사람/대상을 떠올린다',
          sub: '혼자보다, 누군가/무언가와 붙을 때 에너지가 돌아와요',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
      ],
    },

    {
      id: 'q5',
      title:
        '질투가 올라오는 순간(혹은 비슷한 감정)이 있다면, 보통 무엇 때문인가요?',
      subtitle: '질투는 “내 욕망의 핵심”을 가장 빨리 들켜요.',
      choices: [
        {
          id: 'a',
          label: '내 자리가 흔들릴 때',
          sub: '내가 중심이 아니게 되는 느낌, 내 영향력이 줄어드는 느낌',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: '나를 ‘보는 눈’이 다른 곳으로 갈 때',
          sub: '관심이 빠지는 순간, 감정이 바로 차가워져요',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'c',
          label: '우리의 “결속”이 흔들릴 때',
          sub: '둘만의 세계가 깨지는 느낌이 가장 아파요',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'd',
          label: '갑자기 ‘묶일 것 같은’ 기류가 생길 때',
          sub: '좋아도 답답해져요. 출구가 막히면 마음이 달아나요',
          score: { NOMAD: 3, SPECTATOR: 1 },
        },
      ],
    },

    {
      id: 'q6',
      title:
        '사람들이 “당연히 지켜야지”라고 말할 때, 당신이 가장 자주 느끼는 건?',
      subtitle: '규범에 대한 반응이 ‘일탈/통제/안정’ 성향을 갈라요.',
      choices: [
        {
          id: 'a',
          label: '“왜 당연하지?”부터 떠오른다',
          sub: '금지/규칙이 강할수록, 오히려 넘고 싶은 마음이 올라와요',
          score: { REBELLION: 3, SEEKER: 1 },
        },
        {
          id: 'b',
          label: '“나한테 숨 쉴 공간은?”이 먼저다',
          sub: '규칙보다, 이동 가능성과 선택지가 먼저 필요해요',
          score: { NOMAD: 3, REBELLION: 1 },
        },
        {
          id: 'c',
          label: '“그럼 내가 설계할게”로 바뀐다',
          sub: '규칙은 필요해요. 다만 내가 납득 가능한 형태여야 해요',
          score: { CURATOR: 3, SOVEREIGN: 1 },
        },
        {
          id: 'd',
          label: '“지켜야 오래 간다”가 먼저다',
          sub: '안정과 지속이 깨지면 모든 게 무너지는 느낌이 들어요',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
      ],
    },

    {
      id: 'q7',
      title:
        '누군가가 당신을 “잘한다”라고 칭찬할 때, 가장 강하게 꽂히는 칭찬은?',
      subtitle: '욕망은 “어떤 인정에 반응하는지”로도 드러나요.',
      choices: [
        {
          id: 'a',
          label: '“너 진짜 나를 제대로 봤다” 같은 칭찬',
          sub: '디테일하게 알아봐 주는 말이 제일 커요',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'b',
          label: '“너 계속 올라가네” 같은 칭찬',
          sub: '성장/상승/레벨업이 보이면 더 달리고 싶어져요',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: '“너는 끝까지 간다” 같은 칭찬',
          sub: '헌신/몰입을 인정받으면 불이 오래 붙어요',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: '“너 덕분에 안심돼” 같은 칭찬',
          sub: '내가 지켰다는 감각이 가장 크게 남아요',
          score: { GUARDIAN: 3, ANCHOR: 1 },
        },
      ],
    },

    {
      id: 'q8',
      title:
        '친밀한 관계에서 당신의 욕망을 가장 쉽게 “켜는” 건 어떤 리듬인가요?',
      subtitle: '행위가 아니라 ‘조건/리듬/안전감’을 묻는 질문이에요.',
      choices: [
        {
          id: 'a',
          label: '경계가 선명하고 역할이 또렷할 때',
          sub: '존중, 룰, 합의가 잡히면 오히려 더 대담해져요',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: '감정이 깊게 섞이고 결속이 느껴질 때',
          sub: '둘만의 세계가 닫힐수록 더 강하게 반응해요',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: '거리·상상·여운이 길게 유지될 때',
          sub: '가까움보다 ‘안전거리’가 있어야 욕망이 오래 가요',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'd',
          label: '긴장/금기/아슬한 선이 스칠 때',
          sub: '안전한 설렘보다, 위험한 스파크에 더 빨리 켜져요',
          score: { REBELLION: 3, SEEKER: 1 },
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
