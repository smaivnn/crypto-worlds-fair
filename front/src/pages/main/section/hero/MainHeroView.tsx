import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

interface HeroViewProps {
    copy: any;
    className?: string;
    locale: Locale;
    onToggleLocale: () => void;
}
const HeroView = ({ copy, className, locale, onToggleLocale }: HeroViewProps) => {
    return (
        <section className={cn('relative px-6 py-4 text-left', className)}>
            <div className="pointer-events-none absolute right-10 -top-14 h-44 w-44 rounded-full bg-primary/20 blur-[70px]" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-accent-tertiary/15 blur-[70px]" />

            <div className="relative">
                {/* locale 토글 */}
                <button
                    type="button"
                    onClick={onToggleLocale}
                    className="absolute right-0 top-0 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                    aria-label="Toggle language"
                >
                    <span className={locale === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
                    <span className="text-white/25">/</span>
                    <span className={locale === 'ko' ? 'text-white' : 'text-white/40'}>KO</span>
                </button>

                {/* 강조 */}
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                    {copy.eyebrow}
                </div>

                {/* 로고 및 브랜드명 */}
                <div className="mt-4 flex items-center gap-3">
                    <img src="/images/logo_star.svg" alt="Logo" className="h-6 w-6" />
                    <div className="text-[11px] font-semibold tracking-[0.32em] text-white/45">
                        TAAVAH
                    </div>
                </div>

                {/* 제목 */}
                <h1 className="mt-4 text-[32px] leading-[36px] font-semibold tracking-[-0.03em]">
                    {copy.titleTop} <span className="text-primary">{copy.titleAccent}</span>
                    <span className="block text-white/85">{copy.titleBottom}</span>
                </h1>

                {/* 부제 */}
                <p className="mt-3 max-w-[340px] whitespace-pre-line text-[14px] leading-[20px] text-white/70">
                    {copy.sub}
                </p>

                {/* 구분선 */}
                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
            </div>
        </section>
    );
};

export default HeroView;
