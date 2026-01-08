import IconTextButton from '@/components/button/IconTextButton';
import { Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface NewAnalysisButtonViewProps {
    onClick?: ({ path }: { path: string }) => void;
}
const NewAnalysisButtonView = ({ onClick }: NewAnalysisButtonViewProps) => {
    return (
        <div>
            <span
                className={clsx(
                    'pointer-events-none',
                    'absolute -top-6 -translate-x-1/2',
                    'z-20',
                    'relative',
                    'rounded-full  px-4 py-3',
                    'text-[11px] font-semibold tracking-wide whitespace-nowrap',
                    'bg-secondary/90 text-white',
                    'border border-accent/80 backdrop-blur',
                    'shadow-sm',
                    'shadow-[0_12px_30px_-18px_rgba(0,0,0,0.85)]',
                    'drop-shadow-[0_0_18px_rgba(255,220,120,0.18)]',
                    // tail (작은 다이아몬드)
                    'after:content-[""] after:absolute after:left-1/2 after:top-full',
                    'after:-translate-x-1/2 after:-translate-y-1/2',
                    'after:h-2 after:w-2 after:rotate-45',
                    'after:bg-white/20 after:border after:border-accent/80 after:rounded-[2px]',
                )}
            >
                2026 신년운세
            </span>
            <IconTextButton
                fitContent={true}
                className={clsx(
                    'group relative isolate overflow-hidden',
                    'py-2',
                    'bg-accent-secondary text-accent-foreground',
                    'border border-border/60',
                    'transition-all duration-200',
                    'hover:-translate-y-0.5',
                    'hover:bg-accent-secondary/95 hover:border-border/80',
                    'active:scale-[0.99]',
                    // soft inner highlight
                    'before:absolute before:inset-0 before:content-[""]',
                    'before:bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.25),transparent_55%)]',
                    'before:opacity-0 before:transition-opacity before:duration-200',
                    'group-hover:before:opacity-100',
                    // shimmer sweep
                    'after:absolute after:inset-[-40%] after:content-[""] after:pointer-events-none',
                    'after:bg-gradient-to-r after:from-transparent after:via-white/18 after:to-transparent',
                    'after:rotate-12 after:translate-x-[-70%]',
                    'after:transition-transform after:duration-700 after:ease-out',
                    'group-hover:after:translate-x-[70%]',
                )}
                left={<Sparkles className="w-5 h-5" />}
                onClick={() => onClick?.({ path: '/new-analysis' })}
            >
                <div>
                    <span className="font-bold text-lg">Start Your Reading</span>
                    <span className="block text-xs font-medium mt-1 opacity-75">
                        3 Free Readings Available
                    </span>
                </div>
            </IconTextButton>
        </div>
    );
};

export default NewAnalysisButtonView;
