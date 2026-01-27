import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { QuestionSetResponse } from '@/api/question.api';
import { getQuestionSet } from '@/api/question.api';

export const questionQueryKeys = {
    set: (locale: 'en' | 'ko', version: string) => ['question', locale, version] as const,
};

export function useQuestionSetQuery(
    params: { locale: 'en' | 'ko'; version?: string },
    options?: Omit<
        UseQueryOptions<
            QuestionSetResponse,
            Error,
            QuestionSetResponse,
            ReturnType<typeof questionQueryKeys.set>
        >,
        'queryKey' | 'queryFn'
    >,
) {
    const version = params.version ?? 'v1';
    return useQuery({
        queryKey: questionQueryKeys.set(params.locale, version),
        queryFn: () => getQuestionSet({ locale: params.locale, version }),
        ...options,
    });
}
