import { useProfileForm } from './useProfileForm';
import ProfileFormView from './views/ProfileFormView';
import { clearStoredProfile, saveStoredProfile } from './profile.storage';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';

interface ProfileFormProps {
    copy: any;
}
const ProfileForm = ({ copy }: ProfileFormProps) => {
    const navigate = useNavigate();
    const { locale } = useI18n('en');
    const { form, ui, options, labels } = useProfileForm();

    const onSubmit = form.handleSubmit((values) => {
        const normalized = {
            gender: values.gender,
            birthDate: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
            birthTime: values.birthTime || undefined,
            birthPlace: values.birthPlace?.trim() || undefined,
        };

        saveStoredProfile(normalized);
        navigate(toLocalePath('/questions', locale));
    });

    const onClear = () => {
        if (!window.confirm(copy.clearAlert)) return;

        form.reset();
        ui.setIsBirthDateOpen(false);
        ui.setIsBirthTimeOpen(false);
        ui.setIsBirthPlaceOpen(false);

        clearStoredProfile();
        navigate(toLocalePath('/', locale));
    };

    const ProfileFormViewProps = {
        form,
        options,
        labels,
        ui,
        copy,
        onSubmit,
        onClear,
    };
    return <ProfileFormView {...ProfileFormViewProps} />;
};

export default ProfileForm;
