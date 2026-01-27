import MainHeroView from './MainHeroView';
import type { Locale } from '@/types/locale';

interface MainHeroProps {
    copy: any;
    locale: Locale;
    setLocale: (locale: Locale) => void;
}
const MainHero = ({ copy, locale, setLocale }: MainHeroProps) => {
    const nextLocale: Locale = locale === 'ko' ? 'en' : 'ko';
    const mainHeroViewProps = {
        copy,
        locale,
        onToggleLocale: () => setLocale(nextLocale),
    };
    return <MainHeroView {...mainHeroViewProps} />;
};

export default MainHero;
