import type { Locale } from '@/types/locale';

/**
 * 주어진 path를 locale 기반 라우팅 규칙에 맞게 정규화합니다.
 *
 * 규칙:
 * - 앱의 기본 언어(en)는 prefix가 없습니다: `/about`
 * - 한국어(ko)는 `/ko` prefix를 붙입니다: `/ko/about`
 *
 * 입력 path는 아래 모두 허용합니다.
 * - `about`, `/about`, `/ko/about`, `/en/about` 등
 *
 * 이 함수는 기존에 붙어있던 locale prefix(ko/en)를 제거한 뒤,
 * 원하는 locale에 맞게 다시 붙여 “중복 prefix”를 방지합니다.
 *
 * 예시:
 * - toLocalePath('about', 'en')      -> '/about'
 * - toLocalePath('/about', 'ko')    -> '/ko/about'
 * - toLocalePath('/ko/about', 'en') -> '/about'
 * - toLocalePath('/en/about', 'ko') -> '/ko/about'
 * - toLocalePath('/ko', 'en')       -> '/'
 * - toLocalePath('/en', 'ko')       -> '/ko'
 */
export function toLocalePath(path: string, locale: Locale): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;

    // ^\/(ko|en)(?=\/|$)
    // - ^\/        : 문자열 시작에서 '/'로 시작하는 부분
    // - (ko|en)     : 그 다음이 'ko' 또는 'en'인 경우
    // - (?=\/|$)   : 뒤에 '/'가 오거나 문자열 끝인 경우에만 매치 (예: '/ko', '/ko/...')
    // 즉, path가 '/ko/...' 또는 '/en/...'처럼 locale prefix로 시작하면 그 prefix를 제거합니다.
    const base = normalized.replace(/^\/(ko|en)(?=\/|$)/, '');
    const clean = base === '' ? '/' : base;

    if (locale === 'ko') {
        return clean === '/' ? '/ko' : `/ko${clean}`;
    }

    return clean;
}
