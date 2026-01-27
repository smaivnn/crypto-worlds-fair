import { QuestionsFooterView } from './QuestionFooter';

export function QuestionsFooter({
    copy,
    canBack,
    canNext,
    isLast,
    onBack,
    onNext,
}: {
    copy: any;
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <QuestionsFooterView
            copy={copy}
            canBack={canBack}
            canNext={canNext}
            isLast={isLast}
            onBack={onBack}
            onNext={onNext}
        />
    );
}
