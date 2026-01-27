import MainView from './MainView';
import { useI18n } from '@/hooks/useI18n';
import { landingCopy } from '@/i18n/landing.copy';

type LandingCopy = typeof landingCopy.en;
const MainPage = () => {
    const { locale, setLocale } = useI18n('en');
    const base: LandingCopy = landingCopy.en;
    const localized: LandingCopy = (landingCopy[locale] ?? landingCopy.en) as LandingCopy;
    const copy = {
        hero: { ...base.hero, ...(localized.hero ?? {}) },
        navigation: { ...base.navigation, ...(localized.navigation ?? {}) },
        footer: { ...base.footer, ...(localized.footer ?? {}) },
    };

    const mainViewProps = { locale, setLocale, copy };
    return <MainView {...mainViewProps} />;
};

export default MainPage;
