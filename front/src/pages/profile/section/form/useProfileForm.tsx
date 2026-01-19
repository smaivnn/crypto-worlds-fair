import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { generateBirthDateOptions } from '@/utils/date';
import { profileSchema, type BirthTimeValue, type FormValues } from './form.schema';
import { loadStoredProfile } from './profile.storage';

type BirthTimeMeta = Record<BirthTimeValue, { label: string; range: string }>;
type BirthTimeEntry = { key: BirthTimeValue; label: string; range: string };
type CountryItem = { code: string; label: string; flag?: string };

const COUNTRY_ITEMS: CountryItem[] = [
    { code: 'US', label: 'United States', flag: '🇺🇸' },
    { code: 'CA', label: 'Canada', flag: '🇨🇦' },
    { code: 'MX', label: 'Mexico', flag: '🇲🇽' },
    { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
    { code: 'IE', label: 'Ireland', flag: '🇮🇪' },
    { code: 'FR', label: 'France', flag: '🇫🇷' },
    { code: 'DE', label: 'Germany', flag: '🇩🇪' },
    { code: 'NL', label: 'Netherlands', flag: '🇳🇱' },
    { code: 'BE', label: 'Belgium', flag: '🇧🇪' },
    { code: 'CH', label: 'Switzerland', flag: '🇨🇭' },
    { code: 'AT', label: 'Austria', flag: '🇦🇹' },
    { code: 'ES', label: 'Spain', flag: '🇪🇸' },
    { code: 'PT', label: 'Portugal', flag: '🇵🇹' },
    { code: 'IT', label: 'Italy', flag: '🇮🇹' },
    { code: 'SE', label: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', label: 'Norway', flag: '🇳🇴' },
    { code: 'DK', label: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', label: 'Finland', flag: '🇫🇮' },
    { code: 'PL', label: 'Poland', flag: '🇵🇱' },
    { code: 'CZ', label: 'Czechia', flag: '🇨🇿' },
    { code: 'TR', label: 'Turkey', flag: '🇹🇷' },
    { code: 'IL', label: 'Israel', flag: '🇮🇱' },
    { code: 'AE', label: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'SA', label: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'IN', label: 'India', flag: '🇮🇳' },
    { code: 'SG', label: 'Singapore', flag: '🇸🇬' },
    { code: 'MY', label: 'Malaysia', flag: '🇲🇾' },
    { code: 'TH', label: 'Thailand', flag: '🇹🇭' },
    { code: 'VN', label: 'Vietnam', flag: '🇻🇳' },
    { code: 'PH', label: 'Philippines', flag: '🇵🇭' },
    { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'JP', label: 'Japan', flag: '🇯🇵' },
    { code: 'KR', label: 'Korea', flag: '🇰🇷' },
    { code: 'CN', label: 'China', flag: '🇨🇳' },
    { code: 'TW', label: 'Taiwan', flag: '🇹🇼' },
    { code: 'HK', label: 'Hong Kong', flag: '🇭🇰' },
    { code: 'AU', label: 'Australia', flag: '🇦🇺' },
    { code: 'NZ', label: 'New Zealand', flag: '🇳🇿' },
    { code: 'BR', label: 'Brazil', flag: '🇧🇷' },
    { code: 'AR', label: 'Argentina', flag: '🇦🇷' },
    { code: 'CL', label: 'Chile', flag: '🇨🇱' },
    { code: 'ZA', label: 'South Africa', flag: '🇿🇦' },
    { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
    { code: 'EG', label: 'Egypt', flag: '🇪🇬' },
];

export const useProfileForm = () => {
    const [isBirthDateOpen, setIsBirthDateOpen] = useState(false);
    const [isBirthTimeOpen, setIsBirthTimeOpen] = useState(false);
    const [isBirthPlaceOpen, setIsBirthPlaceOpen] = useState(false);

    const storedDefaults = useMemo(() => {
        if (typeof window === 'undefined') return {};

        const stored = loadStoredProfile();
        if (!stored?.birthDate) {
            return {
                gender: stored?.gender,
                birthTime: stored?.birthTime,
                birthPlace: stored?.birthPlace,
            } satisfies Partial<FormValues>;
        }

        const m = stored.birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        return {
            gender: stored.gender,
            birthYear: m?.[1],
            birthMonth: m?.[2],
            birthDay: m?.[3],
            birthTime: stored.birthTime,
            birthPlace: stored.birthPlace,
        } satisfies Partial<FormValues>;
    }, []);

    // Form 구조 설정
    const form = useForm<FormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            gender: 'male',
            birthYear: '',
            birthMonth: '',
            birthDay: '',
            birthTime: undefined,
            birthPlace: '',
            ...storedDefaults,
        },
        mode: 'onSubmit',
    });

    const birthYear = useWatch({ control: form.control, name: 'birthYear' });
    const birthMonth = useWatch({ control: form.control, name: 'birthMonth' });
    const birthDay = useWatch({ control: form.control, name: 'birthDay' });
    const gender = useWatch({ control: form.control, name: 'gender' });

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

    const hasRequiredFields = Boolean(gender && birthYear && birthMonth && birthDay);
    const canSubmit = hasRequiredFields && !hasBirthDateError && !form.formState.isSubmitting;

    const genderItems = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'secret', label: 'Secret' },
    ] as const;

    const birthTimeMeta: BirthTimeMeta = {
        ja: { label: 'Zi', range: '23:00–01:00' },
        chuk: { label: 'Chou', range: '01:00–03:00' },
        in: { label: 'Yin', range: '03:00–05:00' },
        myo: { label: 'Mao', range: '05:00–07:00' },
        jin: { label: 'Chen', range: '07:00–09:00' },
        sa: { label: 'Si', range: '09:00–11:00' },
        o: { label: 'Wu', range: '11:00–13:00' },
        mi: { label: 'Wei', range: '13:00–15:00' },
        sin: { label: 'Shen', range: '15:00–17:00' },
        yu: { label: 'You', range: '17:00–19:00' },
        sul: { label: 'Xu', range: '19:00–21:00' },
        hae: { label: 'Hai', range: '21:00–23:00' },
    };

    const birthTimeEntries: BirthTimeEntry[] = useMemo(
        () =>
            (
                Object.entries(birthTimeMeta) as [
                    BirthTimeValue,
                    { label: string; range: string },
                ][]
            ).map(([key, meta]) => ({ key, label: meta.label, range: meta.range })),
        [],
    );

    const quickCountries: CountryItem[] = useMemo(
        () =>
            [...COUNTRY_ITEMS].sort((a, b) =>
                a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }),
            ),
        [],
    );

    const countryByCode = useMemo(
        () =>
            Object.fromEntries(quickCountries.map((c) => [c.code, c])) as Record<
                string,
                CountryItem
            >,
        [quickCountries],
    );

    return {
        form,
        ui: {
            isBirthDateOpen,
            setIsBirthDateOpen,
            isBirthTimeOpen,
            setIsBirthTimeOpen,
            isBirthPlaceOpen,
            setIsBirthPlaceOpen,
            hasBirthDateError,
            canSubmit,
            isSubmitting: form.formState.isSubmitting,
        },
        options: {
            years,
            months,
            days,
            genderItems,
            birthTimeMeta,
            birthTimeEntries,
            quickCountries,
            countryByCode,
        },
        labels: {
            birthDate: birthDateLabel,
            birthTimeButton: (v?: BirthTimeValue) =>
                v
                    ? `${birthTimeMeta[v].range} (${birthTimeMeta[v].label})`
                    : 'Select birth time (optional)',
            birthPlaceButton: (code?: string) => {
                const c = code ? countryByCode[code] : undefined;
                return c ? `${c.flag ?? ''} ${c.label} (${c.code})` : 'Select country (optional)';
            },
        },
    };
};

export type ProfileFormReturn = ReturnType<typeof useProfileForm>;
