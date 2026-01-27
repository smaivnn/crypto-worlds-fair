import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { GlobalModal } from './components/modal';
import { GlobalLoading } from './components/loading';
import MainPage from './pages/main';
import ResultPage from './pages/result';
import ProfilePage from './pages/profile';
import QuestionsPage from './pages/questions';
import SharePage from './pages/share';
import NotFoundPage from './pages/notFound';
import FeedbackPage from './pages/feedback';
import TermsPage from './pages/terms';
import PrivacyPage from './pages/privacy';
import DisclaimerPage from './pages/disclaimer';

function App() {
    return (
        <BrowserRouter>
            {/* Routes */}
            <Routes>
                {/* Page with Menu */}
                <Route
                    path="/"
                    element={
                        <Layout mode="app" screen="mobile" withHeader={false} withFooter={false} />
                    }
                >
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="questions" element={<QuestionsPage />} />
                    <Route path="result" element={<ResultPage />} />
                    <Route path="share/:id" element={<SharePage />} />
                    <Route path="feedback" element={<FeedbackPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="disclaimer" element={<DisclaimerPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route
                    path="ko"
                    element={
                        <Layout mode="app" screen="mobile" withHeader={false} withFooter={false} />
                    }
                >
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="questions" element={<QuestionsPage />} />
                    <Route path="result" element={<ResultPage />} />
                    <Route path="share/:id" element={<SharePage />} />
                    <Route path="feedback" element={<FeedbackPage />} />
                    <Route path="terms" element={<TermsPage />} />
                    <Route path="privacy" element={<PrivacyPage />} />
                    <Route path="disclaimer" element={<DisclaimerPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>

            {/* Global Components */}
            <GlobalModal />
            <GlobalLoading />
        </BrowserRouter>
    );
}

export default App;
