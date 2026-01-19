// /src/pages/questions/components/QuestionsFooter.tsx
import { cn } from '@/lib/utils';

export function QuestionsFooterView({
    canBack,
    canNext,
    isLast,
    onBack,
    onNext,
}: {
    canBack: boolean;
    canNext: boolean;
    isLast: boolean;
    onBack: () => void;
    onNext: () => void;
}) {
    return (
        <div className="sticky bottom-0 z-10 bg-background/90 backdrop-blur border-t border-white/10">
            <div className="mx-auto w-full max-w-[420px] px-4 py-3 space-y-2">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!canNext}
                    className={cn(
                        'w-full h-12 rounded-full font-semibold transition-opacity',
                        'bg-primary/90 text-primary-foreground',
                        'hover:bg-primary/100 transition-colors',
                        !canNext && 'opacity-40',
                    )}
                >
                    {isLast ? 'See my result' : 'Next'}
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    disabled={!canBack}
                    className={cn(
                        'w-full h-11 rounded-full border border-white/15 bg-white/0 text-white/85',
                        'hover:bg-white/5 transition-opacity',
                        !canBack && 'opacity-30',
                    )}
                >
                    Back
                </button>

                <div className="text-center text-[11px] text-white/45">
                    Saved locally · No sign-up
                </div>
            </div>
        </div>
    );
}
