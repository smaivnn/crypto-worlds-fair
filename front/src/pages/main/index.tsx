import MainView from './MainView';
import { useI18n } from '@/hooks/useI18n';
import { landingCopy } from '@/i18n/landing.copy';

const MainPage = () => {
    const { locale, setLocale } = useI18n('en');
    const copy = landingCopy[locale];
    const mainViewProps = { locale, setLocale, copy };
    return <MainView {...mainViewProps} />;
};

export default MainPage;
