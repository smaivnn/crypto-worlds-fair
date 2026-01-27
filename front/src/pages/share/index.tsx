import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import SharePageView from './SharePageView';
import { useShareResultQuery } from '@/queries/analysis.queries';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { shareCopy } from '@/i18n/share.copy';

const SharePage = () => {
    const navigate = useNavigate();
    const { locale } = useI18n('en');
    const { id } = useParams();
    const shareId = useMemo(() => (id ?? '').trim(), [id]);
    const { data, isLoading, isError, error } = useShareResultQuery(shareId);

    if (!shareId) {
        return <ErrorState message="유효하지 않은 공유 링크입니다." />;
    }

    if (isLoading) {
        return <LoadingState message="공유 결과 불러오는 중..." />;
    }

    if (isError) {
        const status = (error as AxiosError)?.response?.status;
        const message =
            status === 410 ? '공유 링크가 만료되었어요.' : '공유 링크를 찾을 수 없어요.';

        return (
            <ErrorState
                message={message}
                action={{
                    label: '나도 해보러가기',
                    onClick: () => navigate(toLocalePath('/profile', locale)),
                }}
            />
        );
    }

    if (!data?.copy) {
        return null;
    }

    const base = shareCopy.en;
    const localized = (shareCopy[locale] ?? shareCopy.en) as typeof shareCopy.en;
    const uiCopy = {
        tryNow: { ...base.tryNow, ...(localized.tryNow ?? {}) },
        sections: {
            structure: { ...base.sections.structure, ...(localized.sections.structure ?? {}) },
            trigger: { ...base.sections.trigger, ...(localized.sections.trigger ?? {}) },
            illusion: { ...base.sections.illusion, ...(localized.sections.illusion ?? {}) },
            intimacy: { ...base.sections.intimacy, ...(localized.sections.intimacy ?? {}) },
        },
    };

    const tendencyItem = data?.tendency?.items?.[0];
    const tendencyLabel = tendencyItem?.label;
    const tendencyRationale = tendencyItem?.rationale;

    const sharePageViewProps = {
        copy: data.copy,
        onTryNow: () => navigate(toLocalePath('/questions', locale)),
        uiCopy,
        tendencyLabel,
        tendencyRationale,
    };
    return <SharePageView {...sharePageViewProps} />;
};

export default SharePage;
