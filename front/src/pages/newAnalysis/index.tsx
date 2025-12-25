import { Container } from '@/components/container';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationView from './views/naviagtion';
import Header from './views/header';

const NewAnalysisPage = () => {
    return (
        <Container className="flex flex-col min-h-screen py-6 px-4">
            {/* Top: Back */}
            <NavigationView />

            {/* Title + Description */}
            <Header />

            {/* Form */}
            <div className="mt-6 flex-1 min-h-0">{/* ...form goes here... */}</div>
        </Container>
    );
};

export default NewAnalysisPage;
