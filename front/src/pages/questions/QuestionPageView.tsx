import { TopBar } from './section/topBar';
import { QuestionCard } from './section/questionCard';
import { ChoiceGrid } from './section/choiceGrid';
import { QuestionsFooter } from './section/footer';

interface QuestionPageViewProps {
    step: number;
    total: number;
    answered: number;
    question: any;
    copy: any;
    selected?: string;
    onSelect: (choiceId: string) => void;
    onNext: () => void;
    onBack: () => void;
    isTransitioning?: boolean;
}
const QuestionPageView = ({
    step,
    total,
    answered,
    question,
    copy,
    selected,
    onSelect,
    onNext,
    onBack,
    isTransitioning,
}: QuestionPageViewProps) => {
    return (
        <section>
            <TopBar step={step} total={total} answered={answered} />
            <main className="mx-auto w-full max-w-[420px] px-4 pt-4 pb-24">
                <QuestionCard title={question.title} subtitle={question.subtitle} />
                <ChoiceGrid
                    choices={question.choices}
                    value={selected}
                    onSelect={onSelect}
                    isLocked={Boolean(isTransitioning)}
                />
            </main>
            <QuestionsFooter
                copy={copy.footer}
                canBack={step > 1}
                canNext={Boolean(selected)}
                isLast={step === total}
                onBack={onBack}
                onNext={onNext}
            />
        </section>
    );
};

export default QuestionPageView;
