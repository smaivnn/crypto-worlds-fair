import { Container } from '@/components/container';
import Navigation from './section/Navigation';
import HeroView from './section/hero/views/HeroView';
import AnnouncementBar from './section/annoncementBar';

const MainView = () => {
    return (
        <Container className="flex flex-col min-h-full py-6">
            <AnnouncementBar />
            <HeroView />
            <Navigation />
        </Container>
    );
};

export default MainView;
