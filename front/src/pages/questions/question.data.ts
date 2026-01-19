// /src/pages/questions/questions.data.ts
export type Choice = { id: string; label: string; sub?: string };
export type Question = {
    id: string;
    title: string;
    subtitle?: string;
    choices: Choice[];
};

export const QUESTIONS: Question[] = [
    {
        id: 'q1',
        title: 'When a plan breaks, what do you do first?',
        subtitle: 'Don’t overthink. Pick the most natural move.',
        choices: [
            { id: 'a', label: 'Re-take control', sub: 'Decide and stabilize' },
            { id: 'b', label: 'Secure the basics', sub: 'Make it safe first' },
            { id: 'c', label: 'Check the people', sub: 'Who needs what?' },
            { id: 'd', label: 'Step back and observe', sub: 'See the whole board' },
        ],
    },
    {
        id: 'q2',
        title: 'You’re drawn to someone who feels…',
        choices: [
            { id: 'a', label: 'Competent', sub: 'Respectable, steady' },
            { id: 'b', label: 'Intense', sub: 'Deep, consuming' },
            { id: 'c', label: 'Exciting', sub: 'Unpredictable, alive' },
            { id: 'd', label: 'Evolving', sub: 'Always leveling up' },
        ],
    },
    {
        id: 'q3',
        title: 'Your ideal weekend looks like…',
        choices: [
            { id: 'a', label: 'A clean routine', sub: 'Reset, order, calm' },
            { id: 'b', label: 'A meaningful bond', sub: 'One person, deep time' },
            { id: 'c', label: 'A new scene', sub: 'New place, new taste' },
            { id: 'd', label: 'A quiet vantage', sub: 'Distance, reflection' },
        ],
    },
    {
        id: 'q4',
        title: 'When you want something badly, you tend to…',
        choices: [
            { id: 'a', label: 'Negotiate power', sub: 'Terms, boundaries' },
            { id: 'b', label: 'Commit hard', sub: 'Devote and endure' },
            { id: 'c', label: 'Cross the line', sub: 'Taste the forbidden' },
            { id: 'd', label: 'Curate meaning', sub: 'Name it, frame it' },
        ],
    },
    {
        id: 'q5',
        title: 'In conflict, your instinct is…',
        choices: [
            { id: 'a', label: 'Clarify roles', sub: 'Who decides what' },
            { id: 'b', label: 'Hold the bond', sub: 'Don’t break us' },
            { id: 'c', label: 'Exit quickly', sub: 'I need space' },
            { id: 'd', label: 'Analyze it', sub: 'What’s really happening' },
        ],
    },
    {
        id: 'q6',
        title: 'What makes you feel most alive?',
        choices: [
            { id: 'a', label: 'Authority', sub: 'Choice, command' },
            { id: 'b', label: 'Safety', sub: 'Stability, continuity' },
            { id: 'c', label: 'Motion', sub: 'Change, travel' },
            { id: 'd', label: 'Ascent', sub: 'Growth, progress' },
        ],
    },
    {
        id: 'q7',
        title: 'You trust someone when they…',
        choices: [
            { id: 'a', label: 'Respect boundaries', sub: 'No guessing games' },
            { id: 'b', label: 'Stay consistent', sub: 'Same energy, same word' },
            { id: 'c', label: 'See you precisely', sub: 'Details, real attention' },
            { id: 'd', label: 'Let you breathe', sub: 'No pressure' },
        ],
    },
    {
        id: 'q8',
        title: 'If your desire had a shape, it’s…',
        choices: [
            { id: 'a', label: 'A pillar', sub: 'Center, control' },
            { id: 'b', label: 'A flame', sub: 'Devotion, burn' },
            { id: 'c', label: 'A broken line', sub: 'Rebellion, crack' },
            { id: 'd', label: 'A staircase', sub: 'Ascend, beyond' },
        ],
    },
];
