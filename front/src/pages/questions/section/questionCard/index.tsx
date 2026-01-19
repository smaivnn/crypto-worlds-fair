import { QuestionCardView } from './QuestionCard';

export function QuestionCard({
    title,
    subtitle,
    className,
}: {
    title: string;
    subtitle?: string;
    className?: string;
}) {
    return <QuestionCardView title={title} subtitle={subtitle} className={className} />;
}
