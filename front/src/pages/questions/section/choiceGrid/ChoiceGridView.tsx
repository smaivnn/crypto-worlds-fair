import { cn } from '@/lib/utils';
import type { Choice } from '@pages/questions/question.data';

export function ChoiceGridView({
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
        <div className="mt-4 grid grid-cols-1 gap-3">
            {choices.map((c) => {
                const selected = value === c.id;
                return (
                    <button
                        key={c.id}
                        type="button"
                        disabled={isLocked}
                        onClick={() => onSelect(c.id)}
                        className={cn(
                            'w-full rounded-2xl border px-4 py-4 text-left transition-colors duration-200',
                            isLocked && 'cursor-not-allowed',
                            selected
                                ? 'bg-primary text-primary-foreground border-primary/40 hover:bg-primary/90'
                                : 'bg-background hover:bg-white/5 border-white/10',
                        )}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                {/* 제목 */}
                                <div
                                    className={cn(
                                        'text-[15px] font-semibold',
                                        !selected && 'text-white/90',
                                    )}
                                >
                                    {c.label}
                                </div>
                                {c.sub && (
                                    <div
                                        className={cn(
                                            'mt-1 text-[12px]',
                                            selected
                                                ? 'text-primary-foreground/80'
                                                : 'text-white/55',
                                        )}
                                    >
                                        {c.sub}
                                    </div>
                                )}
                            </div>
                            <div
                                className={cn(
                                    'h-5 w-5 rounded-full border grid place-items-center',
                                    selected ? 'border-primary-foreground/40' : 'border-white/15',
                                )}
                            >
                                <div
                                    className={cn(
                                        'h-2.5 w-2.5 rounded-full',
                                        selected ? 'bg-primary-foreground' : 'bg-transparent',
                                    )}
                                />
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
