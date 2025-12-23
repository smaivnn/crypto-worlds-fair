import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { GlobalModal } from './components/modal';
import { GlobalLoading } from './components/loading';
import { GlobalToast } from './components/toast';
import MainPage from './pages/main';
import AboutPage from './pages/about';

function App() {
    return (
        <BrowserRouter>
            {/* Routes */}
            <Routes>
                {/* Page with Menu */}
                <Route element={<Layout screen="full" />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>

                {/* Page without Menu */}
                <Route element={<Layout screen="full" withMenu={false} />}></Route>
            </Routes>

            {/* Global Components */}
            <GlobalModal />
            <GlobalLoading />
            <GlobalToast />
        </BrowserRouter>
    );
}

export default App;
