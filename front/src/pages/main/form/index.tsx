import { z } from 'zod';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { generateBirthDateOptions } from '@/utils/date';
import InputView from './views/InputView';

const schema = z.object({
    name: z.string().trim().min(1, 'Full Name is required'),
    gender: z.enum(['male', 'female']),
    calendarType: z.enum(['solar', 'lunar']),
    birthYear: z.string().regex(/^\d{4}$/, 'Select a year'),
    birthMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Select a month'),
    birthDay: z.string().regex(/^(0[1-9]|[12]\d|3[01])$/, 'Select a day'),
    timezone: z.string().min(1, 'Timezone is required'),
    birthTime: z
        .enum(['ja', 'chuk', 'in', 'myo', 'jin', 'sa', 'o', 'mi', 'sin', 'yu', 'sul', 'hae'])
        .optional(),
    birthLocation: z.string().optional(),
});
export type FormValues = z.infer<typeof schema>;

const Form = () => {
    const [isBirthDateOpen, setIsBirthDateOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            gender: 'male',
            calendarType: 'solar',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            birthTime: undefined,
            birthLocation: '',
        },
    });

    const birthYear = useWatch({ control, name: 'birthYear' });
    const birthMonth = useWatch({ control, name: 'birthMonth' });
    const birthDay = useWatch({ control, name: 'birthDay' });

    const { years, months } = useMemo(() => generateBirthDateOptions({ startYear: 1940 }), []);
    const days = useMemo(() => {
        const y = birthYear ? Number(birthYear) : undefined;
        const m = birthMonth ? Number(birthMonth) : undefined;
        return generateBirthDateOptions({ year: y, month: m }).days;
    }, [birthYear, birthMonth]);

    // 여기로 "모든 값"이 한 번에 들어옴 (gender/calendarType/timezone 포함)
    const onValid = async (values: FormValues) => {
        const birthDate = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;

        const confirmMessage = `You are about to submit the form with the following details:\n
                                - Full Name: ${values.name}
                                - Gender: ${values.gender}
                                - Calendar Type: ${values.calendarType}
                                - Birth Date: ${birthDate}
                                - Timezone: ${values.timezone}
                                - Birth Time: ${values.birthTime ?? 'Not specified'}
                                - Birth Location: ${
                                    values.birthLocation === ''
                                        ? 'Not specified'
                                        : values.birthLocation
                                }\n
                                Do you wish to proceed?`;

        if (!confirm(confirmMessage)) {
            return;
        }
        const params = {
            ...values,
            birthDate,
        };
        console.log('submit values:', params);
        // TODO: API 호출
    };

    const inputViewProps = {
        register,
        control,
        errors,
        isSubmitting,
        onFormSubmit: handleSubmit(onValid),
        years,
        months,
        days,
        birthDateLabel:
            birthYear && birthMonth && birthDay
                ? `${birthYear} / ${Number(birthMonth)} / ${Number(birthDay)}`
                : 'Select birth date',
        isBirthDateOpen,
        setIsBirthDateOpen,
    };

    return <InputView {...inputViewProps} />;
};

export default Form;
