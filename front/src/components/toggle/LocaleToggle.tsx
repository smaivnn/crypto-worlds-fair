import { cn } from '@/lib/utils';
import type { Locale } from '@/types/locale';

export function LocaleToggle({
    locale,
    setLocale,
    className,
}: {
    locale: Locale;
    setLocale: (l: Locale) => void;
    className?: string;
}) {
    return (
        <div className={cn('flex justify-end', className)}>
            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
                <button
                    className={cn(
                        'px-3 py-1.5 text-[12px] font-semibold rounded-lg transition',
                        locale === 'en'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white/80',
                    )}
                    onClick={() => setLocale('en')}
                >
                    EN
                </button>
                <button
                    className={cn(
                        'px-3 py-1.5 text-[12px] font-semibold rounded-lg transition',
                        locale === 'ko'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white/80',
                    )}
                    onClick={() => setLocale('ko')}
                >
                    KO
                </button>
            </div>
        </div>
    );
}
