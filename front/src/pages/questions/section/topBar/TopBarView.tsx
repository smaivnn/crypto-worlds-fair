import { Home, PencilLine } from 'lucide-react';

interface TopBarViewProps {
    step: number;
    total: number;
    clamped: number;
    goTo: (path: string) => void;
}
export function TopBarView({ step, total, clamped, goTo }: TopBarViewProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/70 backdrop-blur-md border-b border-white/10">
            {/* Top Nav */}
            <div className="mx-auto grid h-14 w-full max-w-[520px] grid-cols-[120px_1fr_120px] items-center px-3">
                <button
                    type="button"
                    onClick={() => goTo('/')}
                    className="h-10 w-10 justify-self-start rounded-full grid place-items-center border border-white/10 bg-white/[0.02] text-foreground/85 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/15 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    aria-label="Home"
                >
                    <Home className="h-5 w-5" />
                </button>

                <div className="text-center text-[13px] tracking-wide">
                    <span className="text-foreground/95 font-bold">{step}</span>
                    <span className="text-foreground/35"> / </span>
                    <span className="text-foreground/60">{total}</span>
                </div>

                <button
                    type="button"
                    onClick={() => goTo('/profile')}
                    className="h-10 w-full px-3 rounded-full flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] text-foreground/85 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/15 active:translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    aria-label="Edit profile"
                >
                    <PencilLine className="h-4 w-4" />
                    <span className="text-[12px] font-medium text-foreground/80">Edit profile</span>
                </button>
            </div>

            {/* Progress */}
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full w-full bg-primary origin-left transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                    style={{ transform: `scaleX(${clamped / 100})` }}
                />
            </div>
        </div>
    );
}
