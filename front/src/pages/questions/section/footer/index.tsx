import { QuestionsFooterView } from './QuestionFooter';

export function QuestionsFooter({
    canBack,
    canNext,
    isLast,
    onBack,
    onNext,
}: {
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <QuestionsFooterView
            canBack={canBack}
            canNext={canNext}
            isLast={isLast}
            onBack={onBack}
            onNext={onNext}
        />
    );
}
