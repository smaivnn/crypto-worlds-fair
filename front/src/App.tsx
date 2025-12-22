import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './pages/about';
import Layout from './components/layout/Layout';
import { GlobalModal } from './components/modal';
import { GlobalLoading } from './components/loading';
import { GlobalToast } from './components/toast';
import MainPage from './pages/main';

function App() {
    return (
        <BrowserRouter>
            {/* Routes */}
            <Routes>
                {/* Page with Menu */}
                <Route element={<Layout screen="full" />}></Route>

                {/* Page without Menu */}
                <Route element={<Layout screen="full" withMenu={false} />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Route>
            </Routes>

            {/* Global Components */}
            <GlobalModal />
            <GlobalLoading />
            <GlobalToast />
        </BrowserRouter>
    );
}

export default App;
