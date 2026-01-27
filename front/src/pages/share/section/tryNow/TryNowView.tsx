import { ArrowRight } from 'lucide-react';

interface TryNowViewProps {
    onClick: () => void;
    copy: {
        title: string;
        subtitle: string;
        cta: string;
    };
}

const TryNowView = ({ onClick, copy }: TryNowViewProps) => {
    return (
        <div className="px-1">
            <button
                type="button"
                onClick={onClick}
                className="group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a0f0f] via-[#6f1717] to-[#3a0b0b] px-5 py-4 text-left text-white/90 shadow-[0_16px_44px_rgba(139,30,30,0.28)] transition-all duration-300 hover:-translate-y-[2px] hover:from-[#6a1515] hover:via-[#8b1e1e] hover:to-[#5a1212] hover:shadow-[0_22px_60px_rgba(139,30,30,0.42)]"
            >
                <span className="pointer-events-none absolute inset-0">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
                    <span className="absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#8b1e1e]/14 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#8b1e1e]/14 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -inset-x-16 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />
                    <span className="absolute -left-1/3 top-0 h-full w-1/3 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]" />
                </span>
                <span className="relative flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white shadow-inner">
                        <ArrowRight className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                        <span className="text-base font-semibold">{copy.title}</span>
                        <span className="text-xs text-white/55">{copy.subtitle}</span>
                    </span>
                </span>
                <span className="relative rounded-full bg-black/30 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white">
                    {copy.cta}
                </span>
            </button>
        </div>
    );
};

export default TryNowView;
