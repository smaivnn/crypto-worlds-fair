import { TaavahCard } from '@/components/card';

interface IntimacyViewProps {
    lines: string[];
    copy: {
        title: string;
        lockedLabel: string;
        tendencySentence: string;
        lockedLine: string;
        footnote: string;
    };
    tendencySentenceParts?: { prefix: string; token: string; suffix: string };
    tendencyRationale?: string;
}
const IntimacyView = ({
    lines,
    copy,
    tendencySentenceParts,
    tendencyRationale,
}: IntimacyViewProps) => {
    const blurredLine = tendencyRationale ?? copy.lockedLine;

    return (
        <TaavahCard className="group px-4 transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.02] hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {copy.title}
            </div>

            <ul className="mt-2 space-y-2">
                {lines.map((t, i) => (
                    <li
                        key={i}
                        className="flex gap-2 text-sm text-white/80 leading-relaxed transition-colors duration-300 group-hover:text-white/90"
                    >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/35 transition-colors duration-300 group-hover:bg-primary" />
                        <span>{t}</span>
                    </li>
                ))}
            </ul>

            <div className="rounded-xl border border-white/10 bg-black/30 p-3 transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-black/40">
                <div className="text-[11px] text-white/55 transition-colors duration-300 group-hover:text-white/70">
                    {copy.lockedLabel}
                </div>
                {tendencySentenceParts ? (
                    <p className="mt-2 text-sm text-white/80 transition-colors duration-300 group-hover:text-white/90">
                        {tendencySentenceParts.prefix}
                        <span className="inline-block blur-[3px] select-none">
                            {tendencySentenceParts.token}
                        </span>
                        {tendencySentenceParts.suffix}
                    </p>
                ) : null}
                <p className="mt-2 text-sm text-white/70 blur-[3px] select-none transition-colors duration-300 group-hover:text-white/80">
                    {blurredLine}
                </p>
            </div>

            <div className="mt-3 text-[12px] text-white/50 leading-relaxed transition-colors duration-300 group-hover:text-white/70">
                {copy.footnote}
            </div>
        </TaavahCard>
    );
};

export default IntimacyView;
