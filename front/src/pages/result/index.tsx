import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStoredProfile } from '../profile/section/form/profile.storage';
import ResultPageView from './ResultPageView';
import { useAnalysisResultMutation, useShareResultMutation } from '@/queries/analysis.queries';
import type { AnalysisResultRequest } from '@/api/analysis.api';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { toast } from 'sonner';
import { resultCopy } from '@/i18n/result.copy';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { locale } = useI18n('en');

    // prepare request data
    const answers = useMemo(
        () => (location.state as { answers?: Record<string, string> } | undefined)?.answers,
        [location.state],
    );
    const profile = useMemo(() => loadStoredProfile(), []);

    // answer와 profile이 모두 유효할 때 request 생성
    const request = useMemo<AnalysisResultRequest | null>(() => {
        if (!answers || !profile?.gender || !profile.birthDate) {
            return null;
        }

        return {
            profile: {
                gender: profile.gender,
                birthDate: profile.birthDate,
                birthTime: profile.birthTime,
                birthPlace: profile.birthPlace,
            },
            answers,
            version: 'v1',
            locale,
        };
    }, [answers, locale, profile]);

    const { mutate, data, isPending, isError } = useAnalysisResultMutation();
    const { mutateAsync: createShare, isPending: isShareCreating } = useShareResultMutation();
    const hasRequestedRef = useRef(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    const handleShare = async () => {
        if (!request || !data?.copy) return;
        if (isShareCreating) return;

        // 이미 링크가 생성된 상태라면 클립보드에 복사만 수행
        if (shareUrl) {
            try {
                await navigator.clipboard.writeText(shareUrl);
                toast(locale === 'ko' ? '공유 링크가 복사됐어요.' : 'Share link copied.');
            } catch (error) {
                console.log(error);
                toast(
                    locale === 'ko' ? '공유 링크 복사에 실패했어요.' : 'Failed to copy share link.',
                );
            }
            return;
        }

        // 공유 링크 생성 요청
        try {
            const response = await createShare({
                ...request,
                copy: data.copy,
            });
            const url = `${window.location.origin}${response.shareUrl}`;
            setShareUrl(url);
            toast(
                locale === 'ko'
                    ? '링크가 생성됐어요. 다시 눌러 복사하세요.'
                    : 'Link created. Tap again to copy.',
            );
        } catch (error) {
            toast(
                locale === 'ko' ? '공유 링크 생성에 실패했어요.' : 'Failed to create share link.',
            );
        }
    };

    // answers 또는 profile이 변경되면 공유 링크 초기화
    useEffect(() => {
        setShareUrl(null);
    }, [request]);

    // 입력값 검증 및 리다이렉트
    useEffect(() => {
        if (!answers) {
            navigate(toLocalePath('/questions', locale), { replace: true });
            return;
        }
        if (!profile?.gender || !profile.birthDate) {
            navigate(toLocalePath('/profile', locale), { replace: true });
        }
    }, [answers, locale, navigate, profile]);

    // 결과 요청
    useEffect(() => {
        if (!request) return;
        if (hasRequestedRef.current) return; // 페이지 진입 시 1회만 실행되도록
        hasRequestedRef.current = true;
        mutate(request); // api 요청
    }, [request, mutate]);

    if (isPending) {
        return <LoadingState message="Loading result..." />;
    }

    if (isError) {
        return (
            <ErrorState
                message="Failed to load result."
                action={{
                    label: 'Retry',
                    onClick: () => request && mutate(request),
                }}
            />
        );
    }

    if (!data?.copy) {
        return <EmptyState message="No result available." />;
    }

    const shareLabel = isShareCreating
        ? locale === 'ko'
            ? '링크 생성 중...'
            : 'Creating link...'
        : shareUrl
          ? locale === 'ko'
              ? '링크 복사하기'
              : 'Copy link'
          : locale === 'ko'
            ? '결과 공유하기'
            : 'Share result';

    const shareHint = shareUrl
        ? locale === 'ko'
            ? '링크가 준비됐어요. 다시 눌러 복사하세요.'
            : 'Link is ready. Tap again to copy.'
        : undefined;

    const base = resultCopy.en;
    const localized = (resultCopy[locale] ?? resultCopy.en) as typeof resultCopy.en;
    const uiCopy = {
        sections: {
            structure: { ...base.sections.structure, ...(localized.sections.structure ?? {}) },
            trigger: { ...base.sections.trigger, ...(localized.sections.trigger ?? {}) },
            illusion: { ...base.sections.illusion, ...(localized.sections.illusion ?? {}) },
            intimacy: { ...base.sections.intimacy, ...(localized.sections.intimacy ?? {}) },
        },
        paywall: { ...base.paywall, ...(localized.paywall ?? {}) },
        feedbackCta: { ...base.feedbackCta, ...(localized.feedbackCta ?? {}) },
    };

    const tendencyItem = data?.tendency?.items?.[0];
    const tendencyLabel = tendencyItem?.label;
    const tendencyRationale = tendencyItem?.rationale;

    const resultPageViewProps = {
        copy: data.copy,
        onShare: handleShare,
        onFeedback: () => navigate(toLocalePath('/feedback', locale)),
        shareLabel,
        shareHint,
        isShareCreating,
        uiCopy,
        tendencyLabel,
        tendencyRationale,
        feedbackCta: uiCopy.feedbackCta,
    };
    return <ResultPageView {...resultPageViewProps} />;
};

export default ResultPage;
