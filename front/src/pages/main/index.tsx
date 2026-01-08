import { useEffect, useState } from 'react';
import MainView from './MainView';
import { safeJsonParse } from '@/utils/data';
import { useUserStore } from '@/store/user';

const MainPage = () => {
    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        const profile = localStorage.getItem('profile');
        const user = profile ? safeJsonParse(profile, null) : null;
        if (user) {
            setUser(user);
        }
    }, []);

    return <MainView />;
};

export default MainPage;
