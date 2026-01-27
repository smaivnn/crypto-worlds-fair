import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeedbackCtaViewProps = {
    onClick: () => void;
    label: string;
    tag: string;
    disabled?: boolean;
};

const FeedbackCtaView = ({ onClick, label, tag, disabled }: FeedbackCtaViewProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/12 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/95 shadow-[0_12px_34px_rgba(0,0,0,0.40)] transition-all duration-300 hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/[0.05] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                disabled && 'pointer-events-none opacity-60',
            )}
        >
            <span className="pointer-events-none absolute inset-0">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60" />
                <span className="absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-white/12 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-white/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute -left-1/3 top-0 h-full w-1/3 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]" />
            </span>
            <span className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/75 transition-colors duration-300 group-hover:border-white/70 group-hover:text-white/85 sm:flex">
                {tag}
            </span>
            <span className="relative flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-white/85 transition-colors duration-300 group-hover:text-white" />
                {label}
            </span>
        </button>
    );
};

export default FeedbackCtaView;
