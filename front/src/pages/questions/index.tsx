import { useEffect } from 'react';
import QuestionPageView from './QuestionPageView';
import { loadStoredProfile } from '../profile/section/form/profile.storage';
import { useI18n } from '@/hooks/useI18n';
import useQuestionFlow from '@/hooks/useQuestionFlow';
import { useQuestionSetQuery } from '@/queries/question.queries';
import { questionCopy } from '@/i18n/question.copy';
import { useNavigate } from 'react-router-dom';
import { toLocalePath } from '@/lib/locale';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

type QuestionCopy = typeof questionCopy.en;
const QuestionsPage = () => {
    const { locale } = useI18n('en');
    const navigate = useNavigate();
    // fetch question set
    const { data: questionSet, isLoading, isError, refetch } = useQuestionSetQuery({ locale });
    const questions = questionSet?.questions ?? [];
    const {
        total,
        stepIdx,
        answered,
        question,
        selected,
        onSelect,
        onNext,
        onBack,
        isTransitioning,
    } = useQuestionFlow(questions);

    // prepare localized copy
    const base: QuestionCopy = questionCopy?.en;
    const localized: QuestionCopy = (questionCopy[locale] ?? questionCopy.en) as QuestionCopy;
    const copy = {
        footer: { ...base.footer, ...(localized.footer ?? {}) },
    };

    // redirect to profile if birth date is missing
    useEffect(() => {
        const storage = loadStoredProfile();
        if (!storage?.birthDate) {
            navigate(toLocalePath('/profile', locale), { replace: true });
        }
    }, [locale, navigate]);

    useEffect(() => {
        const scrollTarget = document.querySelector<HTMLElement>('.main-content');
        if (scrollTarget) {
            scrollTarget.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [stepIdx]);

    if (isLoading) {
        return <LoadingState message="Loading questions..." />;
    }

    if (isError || !questionSet) {
        return (
            <ErrorState
                message="Failed to load questions."
                action={{ label: 'Retry', onClick: () => refetch() }}
            />
        );
    }

    if (!question) {
        return <EmptyState message="No questions available." />;
    }

    const questionPageViewProps = {
        total,
        step: stepIdx + 1,
        answered,
        question,
        copy,
        selected,
        onSelect,
        onNext,
        onBack,
        isTransitioning,
    };
    return <QuestionPageView {...questionPageViewProps} />;
};

export default QuestionsPage;
