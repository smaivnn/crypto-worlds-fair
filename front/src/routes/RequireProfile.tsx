import { safeJsonParse } from '@/utils/data';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PROFILE_KEY = 'profile_v1';

const RequireProfileLayout = () => {
    const location = useLocation();
    const profile = localStorage.getItem(PROFILE_KEY);
    const parsed = profile ? safeJsonParse(profile, null) : null;

    // 프로필이 없으면 프로필 작성 페이지로 리다이렉트
    if (!parsed) {
        return <Navigate to="/profile" state={{ from: location }} replace />;
    }

    // 프로필이 있으면 전역에 세팅

    return <Outlet />;
};

export default RequireProfileLayout;
