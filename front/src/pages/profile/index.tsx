import ProfileView from './ProfileView';
import { buildBirthDate, type FormValues } from './section/form/form.schema';
import { useProfileForm } from './section/form/useProfileForm';
const ProfilePage = () => {
    const { form, ui, options, labels } = useProfileForm();

    const onValid = async (values: FormValues) => {
        const birthDate = buildBirthDate(values);

        const confirmMessage = [
            'You are about to submit the form with the following details:',
            `- Full Name: ${values.name}`,
            `- Gender: ${values.gender}`,
            `- Calendar Type: ${values.calendarType}`,
            `- Birth Date: ${birthDate}`,
            `- Timezone: ${values.timezone}`,
            `- Birth Time: ${values.birthTime ?? 'Not specified'}`,
            `- Birth Location: ${values.birthLocation ? values.birthLocation : 'Not specified'}`,
            '',
            'Do you wish to proceed?',
        ].join('\n');

        if (!confirm(confirmMessage)) return;

        const params = {
            ...values,
            birthDate,
        };

        console.log('save with values:', params);
    };
    const inputViewProps = {
        register: form.register,
        control: form.control,
        errors: form.formState.errors,
        isSubmitting: form.formState.isSubmitting,
        onFormSubmit: form.handleSubmit(onValid),
        years: options.years,
        months: options.months,
        days: options.days,
        birthDateLabel: labels.birthDate,
        hasBirthDateError: labels.hasBirthDateError,
        isBirthDateOpen: ui.isBirthDateOpen,
        setIsBirthDateOpen: ui.setIsBirthDateOpen,
    };
    return <ProfileView {...inputViewProps} />;
};

export default ProfilePage;
