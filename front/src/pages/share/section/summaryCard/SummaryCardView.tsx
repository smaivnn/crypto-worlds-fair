import { TaavahCard } from '@/components/card';
import { TagPill } from '@/components/tagPill';

interface SummaryCardViewProps {
    mainDesire: string;
    subDesire: string;
    symbolSrc?: string;
    symbolAlt?: string;
    userQuote: string;
    engineLine: string;
    styleLine: string;
    tags: string[];
}
const SummaryCardView = ({
    mainDesire,
    subDesire,
    symbolSrc,
    symbolAlt,
    userQuote,
    engineLine,
    styleLine,
    tags,
}: SummaryCardViewProps) => {
    return (
        <TaavahCard className="group relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#141417] via-[#0f1012] to-[#0b0c0f] shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute -bottom-24 right-8 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            <div className="relative flex flex-col items-center text-center">
                <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold tracking-tight text-white">
                    <span className="relative inline-flex items-center gap-2 rounded-full border border-primary/35 bg-gradient-to-b from-primary/22 to-white/5 px-3 py-1 text-white/95 ring-1 ring-primary/25 shadow-[0_10px_30px_rgba(139,30,30,0.18),0_0_18px_rgba(139,30,30,0.22)]">
                        <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full bg-primary/85 shadow-[0_0_12px_rgba(139,30,30,0.55)]"
                        />
                        <span>{mainDesire}</span>
                    </span>
                    <span className="text-white/35">+</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 bg-white/[0.02] px-2.5 py-0.5 text-white/60">
                        <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full border border-white/30"
                        />
                        <span>{subDesire}</span>
                    </span>
                </div>

                {symbolSrc ? (
                    <img
                        src={symbolSrc}
                        alt={symbolAlt ?? `${mainDesire} symbol`}
                        className="mt-4 h-20 w-20 rounded-2xl border border-white/15 bg-white/5 object-contain shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-primary/50"
                    />
                ) : (
                    <div className="mt-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-primary/50">
                        <div className="h-8 w-8 rounded-md border border-white/20" />
                    </div>
                )}

                <div className="mt-4 px-8 text-sm text-white/85 leading-relaxed">{userQuote}</div>
            </div>

            <div className="relative mt-2 px-8 space-y-2 text-center">
                <div className="mx-auto mb-2 h-px w-10 bg-white/15" />
                <p className="text-sm text-white/80 leading-relaxed">{engineLine}</p>
                <p className="text-sm text-white/70 leading-relaxed">{styleLine}</p>
            </div>

            {tags?.length ? (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {tags.slice(0, 8).map((t) => (
                        <div
                            key={t}
                            className="transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <TagPill tone={'soft'}>{t}</TagPill>
                        </div>
                    ))}
                </div>
            ) : null}
        </TaavahCard>
    );
};

export default SummaryCardView;
