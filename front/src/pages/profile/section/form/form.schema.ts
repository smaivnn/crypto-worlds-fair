import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string().trim().min(1, 'Full Name is required'),
    gender: z.enum(['male', 'female']),
    calendarType: z.enum(['solar', 'lunar']),
    birthYear: z.string().regex(/^\d{4}$/, 'Select a year'),
    birthMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Select a month'),
    birthDay: z.string().regex(/^(0[1-9]|[12]\d|3[01])$/, 'Select a day'),
    timezone: z.string().min(1, 'Timezone is required'),
    birthTime: z
        .enum(['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'])
        .optional(),
    birthLocation: z.string().optional(),
});

export type FormValues = z.infer<typeof profileSchema>;

export const buildBirthDate = (v: Pick<FormValues, 'birthYear' | 'birthMonth' | 'birthDay'>) =>
    `${v.birthYear}-${v.birthMonth}-${v.birthDay}`;
