import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { notFoundCopy } from '@/i18n/notFound.copy';
import { toLocalePath } from '@/lib/locale';

type NotFoundCopy = typeof notFoundCopy.en;
const NotFoundPage = () => {
    const { locale } = useI18n('en');
    const localized: NotFoundCopy = (notFoundCopy[locale] ?? notFoundCopy.en) as NotFoundCopy;

    return (
        <div className="min-h-[100svh] bg-background text-foreground">
            <div className="mx-auto flex min-h-[100svh] max-w-[520px] flex-col items-center justify-center px-6 py-10">
                {/* Mark */}
                <div className="mb-6 grid place-items-center">
                    <div className="relative h-16 w-16 rounded-full border border-border/70 bg-white/[0.02] shadow-[0_0_0_1px_rgba(245,245,245,0.03)_inset]">
                        {/* subtle crack */}
                        <span className="absolute left-1/2 top-1/2 block h-[70%] w-[1px] -translate-x-1/2 -translate-y-1/2 rotate-[22deg] bg-foreground/70" />
                        <span className="absolute left-1/2 top-1/2 block h-[34%] w-[1px] -translate-x-[2px] -translate-y-[2px] rotate-[-28deg] bg-foreground/55" />
                    </div>
                </div>

                {/* Copy */}
                <div className="text-center">
                    <div className="text-[11px] font-semibold tracking-[0.38em] text-foreground/70">
                        {localized.code}
                    </div>
                    <h1 className="mt-3 text-[22px] font-semibold tracking-[-0.01em]">
                        {localized.title}
                    </h1>
                    <p className="mt-3 text-[14px] leading-relaxed text-foreground/75">
                        {localized.desc}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-foreground/55">
                        {localized.hint}
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 grid w-full grid-cols-1 gap-3">
                    <Link
                        to={toLocalePath('/', locale)}
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--accent-red)] px-4 text-[14px] font-semibold text-foreground shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition hover:brightness-[1.03] active:translate-y-px"
                    >
                        {localized.primary}
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to={toLocalePath('/profile', locale)}
                            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border/80 bg-white/[0.03] px-4 text-[13px] font-semibold text-foreground/90 shadow-[0_0_0_1px_rgba(245,245,245,0.03)_inset] transition hover:bg-white/[0.06] hover:border-border active:translate-y-px"
                        >
                            {localized.secondaryA}
                        </Link>
                        <Link
                            to={toLocalePath('/questions', locale)}
                            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border/80 bg-white/[0.03] px-4 text-[13px] font-semibold text-foreground/90 shadow-[0_0_0_1px_rgba(245,245,245,0.03)_inset] transition hover:bg-white/[0.06] hover:border-border active:translate-y-px"
                        >
                            {localized.secondaryB}
                        </Link>
                    </div>
                </div>

                {/* Divider + small line */}
                <div className="mt-8 w-full">
                    <div className="h-px w-full bg-border/70" />
                    <div className="mt-6 text-center text-[10px] font-semibold tracking-[0.32em] text-foreground/35">
                        {localized.footer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
