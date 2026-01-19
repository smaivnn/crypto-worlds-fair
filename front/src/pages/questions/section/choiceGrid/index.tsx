import type { Choice } from '@pages/questions/question.data';
import { ChoiceGridView } from './ChoiceGridView';

export function ChoiceGrid({
    choices,
    value,
    onSelect,
    isLocked,
}: {
    choices: Choice[];
    value?: string;
    onSelect: (choiceId: string) => void;
    isLocked?: boolean;
}) {
    return (
        <ChoiceGridView choices={choices} value={value} onSelect={onSelect} isLocked={isLocked} />
    );
}
