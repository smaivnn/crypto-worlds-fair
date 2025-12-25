import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import { submitBaziForm } from '@/api/bazi.api';
import type { MainFormSubmitRequest, MainFormSubmitResponse } from '@/api/bazi.api';

export const QueryKeys = {
    submitBazyForm: () => ['bazi', 'submitForm'] as const,
};

export function useSubmitBaziFormMutation(
    options?: Omit<
        UseMutationOptions<MainFormSubmitResponse, Error, MainFormSubmitRequest, unknown>,
        'mutationFn'
    >,
) {
    return useMutation({
        mutationKey: QueryKeys.submitBazyForm(),
        mutationFn: submitBaziForm,
        ...options,
    });
}
