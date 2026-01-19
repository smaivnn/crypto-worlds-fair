import { useProfileForm } from './useProfileForm';
import ProfileFormView from './views/ProfileFormView';
import { clearStoredProfile, saveStoredProfile } from './profile.storage';

interface ProfileFormProps {
    copy: any;
}
const ProfileForm = ({ copy }: ProfileFormProps) => {
    const { form, ui, options, labels } = useProfileForm();

    const onSubmit = form.handleSubmit((values) => {
        const normalized = {
            gender: values.gender,
            birthDate: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
            birthTime: values.birthTime || undefined,
            birthPlace: values.birthPlace?.trim() || undefined,
        };

        saveStoredProfile(normalized);
    });

    const onClear = () => {
        if (!window.confirm(copy.clearAlert)) return;

        form.reset();
        ui.setIsBirthDateOpen(false);
        ui.setIsBirthTimeOpen(false);
        ui.setIsBirthPlaceOpen(false);

        clearStoredProfile();
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
