import { cn } from '@/lib/utils';

export function QuestionCardView({
    title,
    subtitle,
    className,
}: {
    title: string;
    subtitle?: string;
    className?: string;
}) {
    return (
        <section
            className={cn(
                'rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.45)]',
                className,
            )}
        >
            <div className="text-[12px] tracking-[0.18em] text-white/50">QUESTION</div>
            <h2 className="mt-2 text-[18px] leading-[24px] font-semibold tracking-[-0.02em] text-white/95">
                {title}
            </h2>
            {subtitle ? (
                <p className="mt-2 text-[13px] leading-[19px] text-white/60">{subtitle}</p>
            ) : (
                <p className="mt-2 text-[13px] leading-[19px] text-white/55">
                    Pick one. Don’t think too hard.
                </p>
            )}
        </section>
    );
}
