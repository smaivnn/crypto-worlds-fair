import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';

type Question = {
    id: string;
    title: string;
    subtitle?: string;
    choices: { id: string; label: string; sub?: string }[];
};

// 질문 흐름(선택/이동)을 관리하는 훅
const useQuestionFlow = (questions: Question[]) => {
    const navigate = useNavigate();
    const { locale } = useI18n('en');
    const [stepIdx, setStepIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const autoAdvanceTimeoutRef = useRef<number | null>(null);
    // 자동 이동 대기 중 연속 클릭을 막기 위한 잠금 상태
    const [isTransitioning, setIsTransitioning] = useState(false);
    // 빠른 이동 시에도 최신 answers를 보장하기 위한 레퍼런스
    const answersRef = useRef<Record<string, string>>({});

    const total = questions.length;
    const question = questions[stepIdx];
    const selected = question ? answers[question.id] : undefined;
    const isLast = stepIdx === total - 1;
    const answered = Object.keys(answers).length;

    /**
     * 자동 진행 타이머 클리어
     */
    const clearAutoAdvanceTimer = () => {
        if (autoAdvanceTimeoutRef.current != null) {
            window.clearTimeout(autoAdvanceTimeoutRef.current);
            autoAdvanceTimeoutRef.current = null;
        }
    };

    /**
     * 자동 진행 클리어 및 트랜지션 상태 해제
     */
    const clearAutoAdvance = () => {
        clearAutoAdvanceTimer();
        if (isTransitioning) {
            setIsTransitioning(false);
        }
    };

    /**
     * 로케일 변경 등으로 질문 흐름을 초기화
     */
    const resetFlow = () => {
        clearAutoAdvance();
        setStepIdx(0);
        setAnswers({});
        answersRef.current = {};
    };

    /**
     * 답변 선택 처리기
     */
    const onSelect = (choiceId: string) => {
        if (!question) return;
        if (isTransitioning) return; // 트랜지션 중에는 선택 무시
        clearAutoAdvance();

        // 현재 질문에 대한 답변 저장
        // setState가 비동기라 빠르게 Next를 눌렀을 때 최신 answers가 누락될 수 있어 ref로 즉시 갱신
        const nextAnswers = { ...answersRef.current, [question.id]: choiceId };
        answersRef.current = nextAnswers;
        setAnswers(nextAnswers);

        // 마지막 질문이 아니면 자동으로 다음 질문으로 이동
        if (!isLast) {
            setIsTransitioning(true);
            autoAdvanceTimeoutRef.current = window.setTimeout(() => {
                setStepIdx((i) => Math.min(total - 1, i + 1));
                autoAdvanceTimeoutRef.current = null;
                setIsTransitioning(false);
            }, 300);
        }
    };

    /**
     * 다음 질문으로 이동 / 마지막이면 결과 페이지로 이동
     */
    const onNext = () => {
        clearAutoAdvance();
        const currentAnswers = answersRef.current;
        const currentSelected = question ? currentAnswers[question.id] : undefined;
        if (!currentSelected) return;
        if (isLast) {
            navigate(toLocalePath('/result', locale), { state: { answers: currentAnswers } });
            return;
        }
        setStepIdx((i) => Math.min(total - 1, i + 1));
    };

    /**
     * 이전 질문으로 이동
     */
    const onBack = () => {
        clearAutoAdvance();
        setStepIdx((i) => Math.max(0, i - 1));
    };

    /**
     * answers 상태가 바뀔 때마다 ref를 최신으로 유지
     */
    useEffect(() => {
        answersRef.current = answers;
    }, [answers]);

    /**
     * 로케일 변경 시 질문 흐름 초기화
     */
    useEffect(() => {
        resetFlow();
    }, [locale]);

    /**
     * 언마운트 시 타이머 정리
     */
    useEffect(() => () => clearAutoAdvanceTimer(), []);

    return {
        total,
        stepIdx,
        answered,
        question,
        selected,
        onSelect,
        onNext,
        onBack,
        answers,
        isTransitioning,
    };
};

export default useQuestionFlow;
