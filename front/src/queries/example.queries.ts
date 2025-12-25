import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type {
    AnalysisExampleResponse,
    MainFormSubmitRequest,
    MainFormSubmitResponse,
} from '@/api/example.api';
import { getAnalysisExample, submitMainForm } from '@/api/example.api';

export const exampleQueryKeys = {
    analysisExample: () => ['example', 'analysis'] as const,
    submitMainForm: () => ['example', 'submitMainForm'] as const,
};


export function useAnalysisExampleQuery(
    options?: Omit<
        UseQueryOptions<
            AnalysisExampleResponse,
            Error,
            AnalysisExampleResponse,
            ReturnType<typeof exampleQueryKeys.analysisExample>
        >,
        'queryKey' | 'queryFn'
    >,
) {
    return useQuery({
        queryKey: exampleQueryKeys.analysisExample(),
        queryFn: getAnalysisExample,
        ...options,
    });
}

export function useSubmitMainFormMutation(
    options?: Omit<
        UseMutationOptions<MainFormSubmitResponse, Error, MainFormSubmitRequest, unknown>,
        'mutationFn'
    >,
) {
    return useMutation({
        mutationKey: exampleQueryKeys.submitMainForm(),
        mutationFn: submitMainForm,
        ...options,
    });
}
