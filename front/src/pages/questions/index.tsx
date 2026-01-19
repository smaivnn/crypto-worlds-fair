import { useEffect } from 'react';
import QuestionPageView from './QuestionPageView';
import { loadStoredProfile } from '../profile/section/form/profile.storage';

const QuestionsPage = () => {
    useEffect(() => {
        const storage = loadStoredProfile();
        if (!storage?.birthDate) {
            window.location.href = '/profile';
        }
    }, []);

    return <QuestionPageView />;
};

export default QuestionsPage;
