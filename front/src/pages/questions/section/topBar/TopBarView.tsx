import { ChevronLeft } from 'lucide-react';

interface TopBarViewProps {
    step: number;
    total: number;
    goTo: (path: string) => void;
}
export function TopBarView({ step, total, goTo }: TopBarViewProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-white/10">
            <div className="mx-auto w-full max-w-[420px] px-4 py-3 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => goTo('/')}
                    className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                    aria-label="Back"
                >
                    <ChevronLeft className="h-5 w-5 text-white/80" />
                </button>

                <div className="text-[13px] text-white/75">
                    {step} <span className="text-white/35">/</span> {total}
                </div>

                <button
                    type="button"
                    onClick={() => goTo('/profile')}
                    className="text-[12px] text-white/70 hover:text-white underline underline-offset-4"
                >
                    Edit profile
                </button>
            </div>
        </div>
    );
}
