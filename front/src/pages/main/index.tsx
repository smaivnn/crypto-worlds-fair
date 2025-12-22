import { Container } from '@/components/container';
import HeroSectionView from './views/heroSection';
import Form from './form';

const MainPage = () => {
    return (
        <Container>
            <HeroSectionView />
            <Form />
        </Container>
    );
};

export default MainPage;
