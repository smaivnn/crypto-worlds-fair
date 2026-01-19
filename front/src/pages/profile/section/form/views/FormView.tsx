import Grid from '@/components/grid';
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { Controller } from 'react-hook-form';
import WheelColumnView from './WheelColumnView';
import { cn } from '@/lib/utils';
import type { ProfileFormReturn } from '../useProfileForm';
import { Divider } from '@/components/divider';
import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';

interface FormViewProps extends Pick<ProfileFormReturn, 'form' | 'options' | 'labels' | 'ui'> {
    copy: any;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onClear: () => void;
}
const FormView = ({ copy, form, options, labels, ui, onSubmit, onClear }: FormViewProps) => {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <FieldSet>
                {/* Gender */}
                <Field>
                    <FieldLabel htmlFor="gender">
                        {copy.genderLabel}
                        <span className="text-[12px] text-primary">Required</span>
                    </FieldLabel>
                    <Controller
                        name="gender"
                        control={form.control}
                        render={({ field }) => (
                            <div
                                id="gender"
                                role="radiogroup"
                                aria-label="Gender"
                                className="grid grid-cols-3 rounded-md border bg-background p-1"
                            >
                                {options.genderItems.map((item: any) => (
                                    <label
                                        key={item.value}
                                        className={[
                                            'cursor-pointer select-none rounded-md px-3 py-2 text-center text-sm transition-colors',
                                            field.value === item.value
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-foreground/80 hover:bg-accent/10',
                                        ].join(' ')}
                                    >
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={item.value}
                                            checked={field.value === item.value}
                                            onChange={() => field.onChange(item.value)}
                                            onBlur={field.onBlur}
                                            className="sr-only"
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    />
                </Field>

                {/* Birth Date */}
                <Field>
                    <FieldLabel htmlFor="birthDate">
                        {copy.birthDateLabel}
                        <span className="text-[12px] text-primary">Required</span>
                    </FieldLabel>
                    <button
                        type="button"
                        className="w-full text-left px-3 py-2 rounded-md border bg-background flex justify-between items-center hover:bg-accent/10"
                        aria-invalid={ui.hasBirthDateError ? 'true' : 'false'}
                        onClick={() => ui.setIsBirthDateOpen(!ui.isBirthDateOpen)}
                        aria-expanded={ui.isBirthDateOpen}
                        data-state={ui.isBirthDateOpen ? 'open' : 'closed'}
                    >
                        <span>{labels.birthDate}</span>
                        <ChevronDown
                            className={`h-4 w-4 text-muted-foreground/50 ${
                                ui.isBirthDateOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </button>

                    <Grid gap={4} minItemWidth={100} className={ui.isBirthDateOpen ? '' : 'hidden'}>
                        <Controller
                            name="birthYear"
                            control={form.control}
                            render={({ field }) => (
                                <WheelColumnView
                                    ariaLabel="Year"
                                    items={options.years}
                                    value={field.value}
                                    onSelect={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name="birthMonth"
                            control={form.control}
                            render={({ field }) => (
                                <WheelColumnView
                                    ariaLabel="Month"
                                    items={options.months.map((m: any) => String(Number(m)))} // 표시를 1~12로
                                    value={field.value ? String(Number(field.value)) : undefined}
                                    onSelect={(v) => field.onChange(String(v).padStart(2, '0'))}
                                />
                            )}
                        />

                        <Controller
                            name="birthDay"
                            control={form.control}
                            render={({ field }) => (
                                <WheelColumnView
                                    ariaLabel="Day"
                                    items={options.days.map((d: any) => String(Number(d)))} // 표시를 1~31로
                                    value={field.value ? String(Number(field.value)) : undefined}
                                    onSelect={(v) => {
                                        field.onChange(String(v).padStart(2, '0'));
                                        ui.setIsBirthDateOpen(false);
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Field>

                {/* Birth Time */}
                <Field>
                    <FieldLabel htmlFor="birthTime">
                        {copy.birthTimeLabel}
                        <span className="text-[12px] text-muted-foreground">Optional</span>
                    </FieldLabel>
                    <Controller
                        name="birthTime"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <>
                                    <button
                                        type="button"
                                        className="w-full text-left px-3 py-2 rounded-md border bg-background flex justify-between items-center hover:bg-accent/10"
                                        onClick={() => ui.setIsBirthTimeOpen(!ui.isBirthTimeOpen)}
                                        aria-expanded={ui.isBirthTimeOpen}
                                        data-state={ui.isBirthTimeOpen ? 'open' : 'closed'}
                                    >
                                        <span>{labels.birthTimeButton(field.value)}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 text-muted-foreground/50 ${
                                                ui.isBirthTimeOpen ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        />
                                    </button>

                                    <Grid
                                        gap={4}
                                        minItemWidth={100}
                                        className={ui.isBirthTimeOpen ? '' : 'hidden'}
                                        aria-label="Birth Time options"
                                    >
                                        {options.birthTimeEntries.map(({ key, range }) => (
                                            <button
                                                key={key}
                                                type="button"
                                                className={cn(
                                                    'rounded-md border px-3 py-2 text-center text-sm transition-colors',
                                                    field.value === key
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'border bg-background text-foreground/80 hover:bg-accent/10',
                                                )}
                                                onClick={() => {
                                                    field.onChange(key);
                                                    ui.setIsBirthTimeOpen(false);
                                                }}
                                            >
                                                <div>{range}</div>
                                            </button>
                                        ))}
                                    </Grid>

                                    {ui.isBirthTimeOpen && (
                                        <div className="mt-2 flex items-center justify-between">
                                            <button
                                                type="button"
                                                className="text-sm text-muted-foreground underline underline-offset-2"
                                                onClick={() => {
                                                    if (!window.confirm(copy.clearBirthTimeAlert))
                                                        return;
                                                    field.onChange(undefined);
                                                    ui.setIsBirthTimeOpen(false);
                                                }}
                                            >
                                                Clear
                                            </button>
                                            <span className="text-[12px] text-foreground/55">
                                                Leave blank if unknown
                                            </span>
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    />
                </Field>

                {/* 출생국가/도시 */}
                <Field>
                    <FieldLabel htmlFor="birthPlace">
                        {copy.birthPlaceLabel}
                        <span className="text-[12px] text-muted-foreground">Optional</span>
                    </FieldLabel>

                    <Controller
                        name="birthPlace"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <>
                                    <button
                                        type="button"
                                        className="w-full text-left px-3 py-2 rounded-md border bg-background flex justify-between items-center hover:bg-accent/10"
                                        onClick={() => ui.setIsBirthPlaceOpen(!ui.isBirthPlaceOpen)}
                                        aria-expanded={ui.isBirthPlaceOpen}
                                        data-state={ui.isBirthPlaceOpen ? 'open' : 'closed'}
                                    >
                                        <span
                                            className={cn(
                                                field.value && options.countryByCode[field.value]
                                                    ? 'text-foreground'
                                                    : 'text-foreground/70',
                                            )}
                                        >
                                            {labels.birthPlaceButton(field.value)}
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                'h-4 w-4 text-muted-foreground/50 transition-transform',
                                                ui.isBirthPlaceOpen ? 'rotate-180' : 'rotate-0',
                                            )}
                                        />
                                    </button>

                                    <Grid
                                        gap={4}
                                        minItemWidth={140}
                                        className={ui.isBirthPlaceOpen ? '' : 'hidden'}
                                        aria-label="Birth Place options"
                                    >
                                        {options.quickCountries.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                className={cn(
                                                    'rounded-md border px-3 py-2 text-left text-sm transition-colors',
                                                    field.value === country.code
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'border bg-background text-foreground/80 hover:bg-accent/10',
                                                )}
                                                onClick={() => {
                                                    field.onChange(country.code);
                                                    ui.setIsBirthPlaceOpen(false);
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[16px] leading-none">
                                                        {country.flag ?? '🌐'}
                                                    </span>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="truncate font-medium">
                                                            {country.label}
                                                        </div>
                                                        <div className="text-[12px] opacity-70">
                                                            {country.code}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </Grid>

                                    {ui.isBirthPlaceOpen && (
                                        <div className="mt-2 flex items-center justify-between">
                                            <button
                                                type="button"
                                                className="text-sm text-muted-foreground underline underline-offset-2"
                                                onClick={() => {
                                                    if (!window.confirm(copy.clearBirthPlaceAlert))
                                                        return;
                                                    field.onChange('');
                                                    ui.setIsBirthPlaceOpen(false);
                                                }}
                                            >
                                                Clear
                                            </button>
                                            <span className="text-[12px] text-foreground/55">
                                                Leave blank if unknown
                                            </span>
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    />
                </Field>

                <Divider className="my-4" />

                <div className="space-y-3">
                    <PrimaryButton type="submit" disabled={!ui.canSubmit}>
                        {copy.saveButton}
                    </PrimaryButton>
                    <SecondaryButton type="button" onClick={onClear}>
                        {copy.clearButton}
                    </SecondaryButton>
                </div>
            </FieldSet>
        </form>
    );
};

export default FormView;
