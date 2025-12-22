import { Container } from '@/components/container';
import AboutView from './views/about';
import MissionView from './views/mission';

const AboutPage = () => {
    return (
        <Container>
            {/* About Section */}
            <AboutView />

            {/* Mission Section */}
            <MissionView />
        </Container>
    );
};

export default AboutPage;
