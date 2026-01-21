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
// v1 EN (internal, includes scoring)
// ===============================
export const QUESTION_SET_V1_EN: InternalQuestionSet = {
  version: 'v1',
  locale: 'en',
  questions: [
    {
      id: 'q1',
      title: 'When you’re thrown into a new situation, what do you do first?',
      subtitle: 'Pick what feels most natural.',
      choices: [
        {
          id: 'a',
          label: 'Build structure',
          sub: 'Set rules, define the frame',
          score: { ANCHOR: 3, CURATOR: 1 },
        },
        {
          id: 'b',
          label: 'Read the flow',
          sub: 'Watch the room, map the mood',
          score: { SPECTATOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: 'Jump in',
          sub: 'Move first, adjust later',
          score: { SEEKER: 3, WITNESS: 1 },
        },
        {
          id: 'd',
          label: 'Step outside',
          sub: 'Exit the frame, change the game',
          score: { NOMAD: 3, REBELLION: 1 },
        },
      ],
    },

    {
      id: 'q2',
      title: 'In relationships, what moment feels most uncomfortable?',
      choices: [
        {
          id: 'a',
          label: 'When I can’t control it',
          sub: 'No leverage, no say',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: 'When predictability breaks',
          sub: 'The pattern collapses',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: 'When attention disappears',
          sub: 'Silence feels like erasure',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: 'When I feel tied down',
          sub: 'No exit, no air',
          score: { NOMAD: 3, SPECTATOR: 1 },
        },
      ],
    },

    {
      id: 'q3',
      title: 'When you can’t delay a decision, you usually…',
      choices: [
        {
          id: 'a',
          label: 'Decide myself',
          sub: 'I take the wheel',
          score: { SOVEREIGN: 3, ASCENDER: 1 },
        },
        {
          id: 'b',
          label: 'Look for a standard',
          sub: 'Find the rule that holds',
          score: { ANCHOR: 3, CURATOR: 1 },
        },
        {
          id: 'c',
          label: 'Watch reactions',
          sub: 'Sense what people reveal',
          score: { WITNESS: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: 'Choose a new path',
          sub: 'Take the door no one took',
          score: { REBELLION: 3, NOMAD: 1 },
        },
      ],
    },

    {
      id: 'q4',
      title: 'If you were given the same day on repeat, you would…',
      choices: [
        {
          id: 'a',
          label: 'Refine the structure',
          sub: 'Optimize the system',
          score: { CURATOR: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: 'Interpret the meaning',
          sub: 'Decode what it says about me',
          score: { CURATOR: 3, SPECTATOR: 1 },
        },
        {
          id: 'c',
          label: 'Want to escape',
          sub: 'Anything but repetition',
          score: { SEEKER: 3, NOMAD: 1 },
        },
        {
          id: 'd',
          label: 'Feel okay if it’s stable',
          sub: 'Stability is enough',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
      ],
    },

    {
      id: 'q5',
      title: 'In dating, when do you feel pulled in the most?',
      choices: [
        {
          id: 'a',
          label: 'When roles are clear',
          sub: 'Respect, boundaries, terms',
          score: { SOVEREIGN: 3, ANCHOR: 1 },
        },
        {
          id: 'b',
          label: 'When emotions merge',
          sub: 'Deep bond, shared world',
          score: { MERGER: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: 'When tension is in the air',
          sub: 'Edge, risk, spark',
          score: { REBELLION: 3, SEEKER: 1 },
        },
        {
          id: 'd',
          label: 'When it’s freely flowing',
          sub: 'Come and go without pressure',
          score: { NOMAD: 3, SPECTATOR: 1 },
        },
      ],
    },

    {
      id: 'q6',
      title: 'When you set a goal, what matters most?',
      choices: [
        {
          id: 'a',
          label: 'Am I leading it?',
          sub: 'Agency and control',
          score: { SOVEREIGN: 3, ASCENDER: 1 },
        },
        {
          id: 'b',
          label: 'Can it last?',
          sub: 'Sustainability',
          score: { ANCHOR: 3, GUARDIAN: 1 },
        },
        {
          id: 'c',
          label: 'Can I devote myself?',
          sub: 'Commitment and absorption',
          score: { DEVOTEE: 3, MERGER: 1 },
        },
        {
          id: 'd',
          label: 'Does it raise me?',
          sub: 'Growth and ascent',
          score: { ASCENDER: 3, CURATOR: 1 },
        },
      ],
    },

    {
      id: 'q7',
      title: 'When conflict appears, you tend to…',
      choices: [
        {
          id: 'a',
          label: 'Organize it',
          sub: 'Define, sort, resolve',
          score: { CURATOR: 3, SOVEREIGN: 1 },
        },
        {
          id: 'b',
          label: 'Take responsibility',
          sub: 'Hold it together',
          score: { GUARDIAN: 3, DEVOTEE: 1 },
        },
        {
          id: 'c',
          label: 'Step back',
          sub: 'Avoid, observe, wait',
          score: { SPECTATOR: 3, NOMAD: 1 },
        },
        {
          id: 'd',
          label: 'Break it',
          sub: 'Cut through, disrupt',
          score: { REBELLION: 3, SEEKER: 1 },
        },
      ],
    },

    {
      id: 'q8',
      title: 'What state drains you the fastest?',
      choices: [
        {
          id: 'a',
          label: 'No decision power',
          sub: 'Someone else holds the wheel',
          score: { SOVEREIGN: 3, WITNESS: 1 },
        },
        {
          id: 'b',
          label: 'No meaning',
          sub: 'Empty, pointless motion',
          score: { CURATOR: 3, SPECTATOR: 1 },
        },
        {
          id: 'c',
          label: 'No stimulation',
          sub: 'Nothing new, nothing sharp',
          score: { SEEKER: 3, REBELLION: 1 },
        },
        {
          id: 'd',
          label: 'Being bound',
          sub: 'No exit, no freedom',
          score: { NOMAD: 3, ANCHOR: 1 },
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
