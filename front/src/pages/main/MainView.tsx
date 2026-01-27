import { Container } from '@/components/container';
import Navigation from './section/Navigation';
import MainHero from './section/hero';
import type { Locale } from '@/types/locale';
import Footer from './section/footer';

interface MainViewProps {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    copy: any;
}
const MainView = ({ copy, locale, setLocale }: MainViewProps) => {
    return (
        <Container className="flex flex-col min-h-full py-6">
            <MainHero copy={copy.hero} locale={locale} setLocale={setLocale} />
            <Navigation copy={copy.navigation} />
            <Footer copy={copy.footer} />
        </Container>
    );
};

export default MainView;
