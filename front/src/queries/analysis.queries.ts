import { useMutation, useQuery } from '@tanstack/react-query';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getShareResult, postAnalysisResult, postShareResult } from '@/api/analysis.api';
import type {
    AnalysisResultRequest,
    AnalysisResultResponse,
    AnalysisShareRequest,
    AnalysisShareResponse,
    AnalysisShareResultResponse,
} from '@/api/analysis.api';

export const analysisQueryKeys = {
    result: () => ['analysis', 'result'] as const,
    shareCreate: () => ['analysis', 'share', 'create'] as const,
    share: (shareId: string) => ['analysis', 'share', shareId] as const,
};

export function useAnalysisResultMutation(
    options?: Omit<
        UseMutationOptions<AnalysisResultResponse, Error, AnalysisResultRequest, unknown>,
        'mutationFn'
    >,
) {
    return useMutation({
        mutationKey: analysisQueryKeys.result(),
        mutationFn: postAnalysisResult,
        ...options,
    });
}

export function useShareResultMutation(
    options?: Omit<
        UseMutationOptions<AnalysisShareResponse, Error, AnalysisShareRequest, unknown>,
        'mutationFn'
    >,
) {
    return useMutation({
        mutationKey: analysisQueryKeys.shareCreate(),
        mutationFn: postShareResult,
        ...options,
    });
}

export function useShareResultQuery(
    shareId: string,
    options?: Omit<
        UseQueryOptions<
            AnalysisShareResultResponse,
            Error,
            AnalysisShareResultResponse,
            ReturnType<typeof analysisQueryKeys.share>
        >,
        'queryKey' | 'queryFn'
    >,
) {
    return useQuery({
        queryKey: analysisQueryKeys.share(shareId),
        queryFn: () => getShareResult(shareId),
        enabled: Boolean(shareId),
        ...options,
    });
}
