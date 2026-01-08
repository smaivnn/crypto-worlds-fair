import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { generateBirthDateOptions } from '@/utils/date';
import { profileSchema, type FormValues } from './form.schema';

export const useProfileForm = () => {
    const [isBirthDateOpen, setIsBirthDateOpen] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            gender: 'male',
            calendarType: 'solar',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            birthTime: undefined,
            birthLocation: '',
        },
    });

    const birthYear = useWatch({ control: form.control, name: 'birthYear' });
    const birthMonth = useWatch({ control: form.control, name: 'birthMonth' });
    const birthDay = useWatch({ control: form.control, name: 'birthDay' });

    const { years, months } = useMemo(() => generateBirthDateOptions({ startYear: 1940 }), []);

    const days = useMemo(() => {
        const y = birthYear ? Number(birthYear) : undefined;
        const m = birthMonth ? Number(birthMonth) : undefined;
        return generateBirthDateOptions({ year: y, month: m }).days;
    }, [birthYear, birthMonth]);

    const birthDateLabel =
        birthYear && birthMonth && birthDay
            ? `${birthYear} / ${Number(birthMonth)} / ${Number(birthDay)}`
            : 'Select birth date';

    const hasBirthDateError = Boolean(
        form.formState.errors.birthYear ||
            form.formState.errors.birthMonth ||
            form.formState.errors.birthDay,
    );

    return {
        form,
        ui: {
            isBirthDateOpen,
            setIsBirthDateOpen,
        },
        options: {
            years,
            months,
            days,
        },
        labels: {
            birthDate: birthDateLabel,
            hasBirthDateError,
        },
    };
};
