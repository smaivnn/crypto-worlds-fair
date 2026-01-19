import { useEffect, useRef, useState } from 'react';
import QuestionPageView from './QuestionPageView';
import { loadStoredProfile } from '../profile/section/form/profile.storage';
import { QUESTIONS } from './question.data';
import { useNavigate } from 'react-router-dom';

const QuestionsPage = () => {
    const navigate = useNavigate();
    const [stepIdx, setStepIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const autoAdvanceTimeoutRef = useRef<number | null>(null);

    const total = QUESTIONS.length;
    const question = QUESTIONS[stepIdx];
    const selected = answers[question.id];
    const isLast = stepIdx === total - 1;
    const answered = Object.keys(answers).length;

    const clearAutoAdvance = () => {
        if (autoAdvanceTimeoutRef.current != null) {
            window.clearTimeout(autoAdvanceTimeoutRef.current);
            autoAdvanceTimeoutRef.current = null;
        }
    };

    const onSelect = (choiceId: string) => {
        clearAutoAdvance();
        setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));

        // 선택 하이라이트가 잠깐 보인 뒤 자동 진행
        if (!isLast) {
            autoAdvanceTimeoutRef.current = window.setTimeout(() => {
                setStepIdx((i) => Math.min(total - 1, i + 1));
                autoAdvanceTimeoutRef.current = null;
            }, 300);
        }
    };

    const onNext = () => {
        clearAutoAdvance();
        if (!selected) return;
        if (isLast) {
            navigate('/questions/result', { state: { answers } });
            return;
        }
        setStepIdx((i) => Math.min(total - 1, i + 1));
    };

    const onBack = () => {
        clearAutoAdvance();
        setStepIdx((i) => Math.max(0, i - 1));
    };

    useEffect(() => {
        const storage = loadStoredProfile();
        if (!storage?.birthDate) {
            window.location.href = '/profile';
        }
    }, []);

    useEffect(() => () => clearAutoAdvance(), []);

    const questionPageViewProps = {
        total,
        step: stepIdx + 1,
        answered,
        question,
        selected,
        onSelect,
        onNext,
        onBack,
    };
    return <QuestionPageView {...questionPageViewProps} />;
};

export default QuestionsPage;
