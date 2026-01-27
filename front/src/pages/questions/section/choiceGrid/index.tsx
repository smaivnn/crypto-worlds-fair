import { ChoiceGridView } from './ChoiceGridView';

export function ChoiceGrid({
    choices,
    value,
    onSelect,
    isLocked,
}: {
    choices: { id: string; label: string; sub?: string }[];
    value?: string;
    onSelect: (choiceId: string) => void;
    isLocked?: boolean;
}) {
    return (
        <ChoiceGridView choices={choices} value={value} onSelect={onSelect} isLocked={isLocked} />
    );
}
