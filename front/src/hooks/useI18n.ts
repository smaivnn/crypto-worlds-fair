import type { Locale } from '@/types/locale';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useI18n(defaultLocale: Locale = 'en') {
    const { pathname, search, hash } = useLocation();
    const navigate = useNavigate();

    const locale = React.useMemo<Locale>(() => {
        const first = pathname.split('/').filter(Boolean)[0];
        if (first === 'ko') return 'ko';
        if (first === 'en') return 'en';
        return defaultLocale;
    }, [pathname, defaultLocale]);

    const setLocale = React.useCallback(
        (next: Locale) => {
            // 이미 같은 언어일 경우 무시
            if (next === locale) return;
            const segments = pathname.split('/').filter(Boolean);

            // 현재 경로가 '/ko/...' 형태일 경우 'ko' 제거
            if (segments[0] === 'ko') segments.shift();

            // 변경할 언어가 'ko'일 경우 경로 앞에 'ko' 추가
            if (next === 'ko') segments.unshift('ko');

            // 경로를 다시 조합하여 이동
            const nextPath = segments.length ? `/${segments.join('/')}` : '/';
            navigate(`${nextPath}${search}${hash}`, { replace: true });
        },
        [hash, locale, navigate, pathname, search],
    );

    React.useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return { locale, setLocale };
}
