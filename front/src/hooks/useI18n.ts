import type { Locale } from '@/types/locale';
import * as React from 'react';

const LS_KEY = 'taavah.locale';

export function useI18n(defaultLocale: Locale = 'en') {
    const [locale, setLocale] = React.useState<Locale>(() => {
        const saved = (localStorage.getItem(LS_KEY) as Locale | null) ?? null;
        if (saved === 'en' || saved === 'ko') return saved;

        const lang = (typeof navigator !== 'undefined' ? navigator.language : 'en').toLowerCase();
        return lang.startsWith('ko') ? 'ko' : defaultLocale;
    });

    React.useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, locale);
        } catch {}
        document.documentElement.lang = locale;
    }, [locale]);

    return { locale, setLocale };
}
