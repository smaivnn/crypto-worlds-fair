import { useI18n } from '@/hooks/useI18n';
import ProfileView from './ProfileView';
import { profileCopy } from '@/i18n/profile.copy';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const { locale, setLocale } = useI18n('en');
    const navigate = useNavigate();
    const copy = profileCopy[locale];
    const onBack = () => {
        navigate('/');
    };

    const inputViewProps = {
        copy,
        onBack,
    };
    return <ProfileView {...inputViewProps} />;
};

export default ProfilePage;
