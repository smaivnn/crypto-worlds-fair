import { TaavahCard } from '@/components/card';

interface PaywallViewProps {
    paywallCTA: string;
    note: string;
}
const PaywallView = ({ paywallCTA, note }: PaywallViewProps) => {
    return (
        <TaavahCard className="group relative overflow-hidden px-4 transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.02] hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary/90">
                    UNLOCK
                </div>
                <p className="mt-2 text-sm text-white/85 leading-relaxed">{paywallCTA}</p>
            </div>

            <button
                type="button"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#8B1E1E] px-4 py-3 text-sm font-semibold text-[#F5F5F5] shadow-[0_10px_24px_rgba(139,30,30,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9A2323] hover:shadow-[0_14px_28px_rgba(139,30,30,0.45)] active:translate-y-0 active:shadow-[0_8px_18px_rgba(139,30,30,0.35)]"
            >
                <span className="pointer-events-none absolute inset-0">
                    <span className="absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#FF4D4D]/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#FF4D4D]/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute -inset-x-16 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF7A7A]/70 to-transparent opacity-50" />
                    <span className="absolute -left-1/3 top-0 h-full w-1/3 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]" />
                </span>
                <span className="relative flex items-center gap-2">Unlock Full Report</span>
            </button>

            <div className="mt-2 text-center text-[11px] text-white/55 transition-colors duration-300 group-hover:text-white/70">
                {note}
            </div>
        </TaavahCard>
    );
};

export default PaywallView;
