import { Container } from '@/components/container';
import AnnouncementBarView from './views/announcementBar';
import Navigation from './views/Navigation';
import HeroSectionView from './views/heroSection';

const MainPage = () => {
    return (
        <Container className="flex flex-col min-h-screen py-6">
            <AnnouncementBarView />
            <HeroSectionView />
            {/* <Form /> */}
            <Navigation />
        </Container>
    );
};

export default MainPage;
