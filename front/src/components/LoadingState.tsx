import { cn } from '@/lib/utils';

type LoadingStateProps = {
    message?: string;
    className?: string;
};

export function LoadingState({ message = 'Loading...', className }: LoadingStateProps) {
    return (
        <div
            className={cn(
                'min-h-screen flex flex-col items-center justify-center gap-3 text-sm text-white/70',
                className,
            )}
        >
            <div className="h-2 w-2 rotate-45 rounded-[2px] bg-accent/80 shadow-[0_0_12px_rgba(255,220,120,0.35)]" />
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            <div>{message}</div>
        </div>
    );
}
