import { useI18n } from '@/hooks/useI18n';
import ProfileView from './ProfileView';
import { profileCopy } from '@/i18n/profile.copy';
import { useNavigate } from 'react-router-dom';
import { toLocalePath } from '@/lib/locale';

type ProfileCopy = typeof profileCopy.en;
const ProfilePage = () => {
    const { locale } = useI18n('en');
    const navigate = useNavigate();
    const base: ProfileCopy = profileCopy.en;
    const localized: ProfileCopy = (profileCopy[locale] ?? profileCopy.en) as ProfileCopy;
    const copy = {
        intro: { ...base.intro, ...(localized.intro ?? {}) },
        privacyNote: { ...base.privacyNote, ...(localized.privacyNote ?? {}) },
        form: { ...base.form, ...(localized.form ?? {}) },
    };

    const onBack = () => {
        navigate(toLocalePath('/', locale));
    };

    const inputViewProps = {
        copy,
        onBack,
    };
    return <ProfileView {...inputViewProps} />;
};

export default ProfilePage;
