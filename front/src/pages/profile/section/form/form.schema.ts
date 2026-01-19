import { z } from 'zod';

export const birthTimeValues = [
    'ja',
    'chuk',
    'in',
    'myo',
    'jin',
    'sa',
    'o',
    'mi',
    'sin',
    'yu',
    'sul',
    'hae',
] as const;

export type BirthTimeValue = (typeof birthTimeValues)[number];

export const profileSchema = z.object({
    gender: z.enum(['male', 'female', 'secret']),
    birthYear: z.string().regex(/^\d{4}$/, 'Select a year'),
    birthMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Select a month'),
    birthDay: z.string().regex(/^(0[1-9]|[12]\d|3[01])$/, 'Select a day'),
    birthTime: z.enum(birthTimeValues).optional(),
    // Optional. In UI this is currently a country code (e.g. "KR") or "".
    birthPlace: z.string().trim().optional(),
});

// Use the schema *input* type for react-hook-form values.
// This avoids type mismatches between Zod v4 optional keys and @hookform/resolvers.
export type FormValues = z.input<typeof profileSchema>;

export const buildBirthDate = (v: Pick<FormValues, 'birthYear' | 'birthMonth' | 'birthDay'>) =>
    `${v.birthYear}-${v.birthMonth}-${v.birthDay}`;
