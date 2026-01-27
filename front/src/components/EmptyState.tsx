import { cn } from '@/lib/utils';

type StateAction = {
    label: string;
    onClick: () => void;
};

type EmptyStateProps = {
    message?: string;
    action?: StateAction;
    className?: string;
};

export function EmptyState({
    message = 'No data available.',
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'min-h-screen flex flex-col items-center justify-center gap-4 text-sm text-white/70',
                className,
            )}
        >
            <div>{message}</div>
            {action ? (
                <button
                    type="button"
                    onClick={action.onClick}
                    className="rounded-md border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white/40"
                >
                    {action.label}
                </button>
            ) : null}
        </div>
    );
}
