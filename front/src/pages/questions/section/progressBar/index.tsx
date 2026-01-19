import { ProgressBarView } from './ProgressBarView';

export function ProgressBar({ answered, total }: { answered: number; total: number }) {
    const progress = Math.round((answered / total) * 100);
    return <ProgressBarView value={progress} />;
}
