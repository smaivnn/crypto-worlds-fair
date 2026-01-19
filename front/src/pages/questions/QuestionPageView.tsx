import { TopBar } from './section/topBar';
import { ProgressBar } from './section/progressBar';
import { QuestionCard } from './section/questionCard';
import { ChoiceGrid } from './section/choiceGrid';
import { QuestionsFooter } from './section/footer';

interface QuestionPageViewProps {
    step: number;
    total: number;
    answered: number;
    question: any;
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
    selected,
    onSelect,
    onNext,
    onBack,
    isTransitioning,
}: QuestionPageViewProps) => {
    return (
        <section>
            <TopBar step={step} total={total} />
            <ProgressBar answered={answered} total={total} />
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
