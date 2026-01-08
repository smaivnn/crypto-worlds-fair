import { Container } from '@/components/container';
import NavigationView from './section/naviagtion';
import Header from './section/header';
import Form from './section/form';

const NewAnalysisView = () => {
    return (
        <Container className="flex flex-col min-h-screen py-6 px-4">
            <NavigationView />
            <Header />
            <Form />
        </Container>
    );
};

export default NewAnalysisView;
