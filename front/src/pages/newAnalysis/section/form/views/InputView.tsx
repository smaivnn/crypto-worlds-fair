import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TimezoneSelect, { type ITimezoneOption } from 'react-timezone-select';
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import type { FormValues } from '../index';
import Grid from '@/components/grid';
import { ChevronDown } from 'lucide-react';

function WheelColumn({
    items,
    value,
    onSelect,
    ariaLabel,
}: {
    items: string[];
    value?: string;
    onSelect: (v: string) => void;
    ariaLabel: string;
}) {
    return (
        <div
            role="listbox"
            aria-label={ariaLabel}
            className="h-56 overflow-y-auto rounded-md border bg-background"
            style={{
                scrollSnapType: 'y mandatory',
            }}
        >
            {items.map((it) => {
                const active = it === value;
                return (
                    <button
                        key={it}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => onSelect(it)}
                        className={[
                            'w-full py-3 text-sm',
                            'hover:bg-accent hover:text-accent-foreground',
                            active
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-foreground',
                        ].join(' ')}
                        style={{ scrollSnapAlign: 'center' }}
                    >
                        {it}
                    </button>
                );
            })}
        </div>
    );
}

interface InputViewProps {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
    isSubmitting: boolean;
    onFormSubmit: React.FormEventHandler<HTMLFormElement>;
    years: string[];
    months: string[];
    days: string[];
    birthDateLabel: string;
    isBirthDateOpen: boolean;
    setIsBirthDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const InputView = ({
    register,
    control,
    errors,
    isSubmitting,
    onFormSubmit,
    years,
    months,
    days,
    birthDateLabel,
    isBirthDateOpen,
    setIsBirthDateOpen,
}: InputViewProps) => {
    return (
        <section>
            <form
                className="mx-auto my-12 md:my-8 p-6 md:p-8 border rounded-lg shadow-sm"
                onSubmit={onFormSubmit}
            >
                <FieldSet>
                    <FieldLegend>Your Information required</FieldLegend>
                    <FieldDescription>We need these to generate your analysis.</FieldDescription>

                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                autoComplete="off"
                                placeholder=""
                                aria-invalid={errors.name ? 'true' : 'false'}
                                {...register('name')}
                            />
                            {errors.name?.message && (
                                <FieldError>{`${errors.name?.message}`}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Gender</FieldLabel>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <label
                                                htmlFor="male"
                                                className="text-sm cursor-pointer"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <label
                                                htmlFor="female"
                                                className="text-sm cursor-pointer"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Calendar Type</FieldLabel>
                            <Controller
                                name="calendarType"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="solar" id="solar" />
                                            <label
                                                htmlFor="solar"
                                                className="text-sm cursor-pointer"
                                            >
                                                Solar Calendar (most common)
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="lunar" id="lunar" />
                                            <label
                                                htmlFor="lunar"
                                                className="text-sm cursor-pointer"
                                            >
                                                Lunar Calendar
                                            </label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="birthDate">Birth Date</FieldLabel>
                            {/* trigger */}
                            <button
                                type="button"
                                className="w-full text-left px-3 py-2 rounded-md border bg-background flex justify-between items-center hover:bg-accent/10"
                                aria-invalid
                                onClick={() => setIsBirthDateOpen(!isBirthDateOpen)}
                                aria-expanded={isBirthDateOpen}
                                data-state={isBirthDateOpen ? 'open' : 'closed'}
                            >
                                <span>{birthDateLabel}</span>
                                <ChevronDown
                                    className={`h-4 w-4 text-muted-foreground/50 ${
                                        isBirthDateOpen ? 'rotate-180' : 'rotate-0'
                                    }`}
                                />
                            </button>
                            <Grid
                                gap={4}
                                minItemWidth={100}
                                className={isBirthDateOpen ? '' : 'hidden'}
                            >
                                <Controller
                                    name="birthYear"
                                    control={control}
                                    render={({ field }) => (
                                        <WheelColumn
                                            ariaLabel="Year"
                                            items={years}
                                            value={field.value}
                                            onSelect={field.onChange}
                                        />
                                    )}
                                />

                                <Controller
                                    name="birthMonth"
                                    control={control}
                                    render={({ field }) => (
                                        <WheelColumn
                                            ariaLabel="Month"
                                            items={months.map((m) => String(Number(m)))} // 표시를 1~12로
                                            value={
                                                field.value
                                                    ? String(Number(field.value))
                                                    : undefined
                                            }
                                            onSelect={(v) =>
                                                field.onChange(String(v).padStart(2, '0'))
                                            }
                                        />
                                    )}
                                />

                                <Controller
                                    name="birthDay"
                                    control={control}
                                    render={({ field }) => (
                                        <WheelColumn
                                            ariaLabel="Day"
                                            items={days.map((d) => String(Number(d)))} // 표시를 1~31로
                                            value={
                                                field.value
                                                    ? String(Number(field.value))
                                                    : undefined
                                            }
                                            onSelect={(v) => {
                                                field.onChange(String(v).padStart(2, '0'));
                                                setIsBirthDateOpen(false);
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            {errors.birthYear?.message ||
                                errors.birthMonth?.message ||
                                (errors.birthDay?.message && (
                                    <FieldError>{`Birth Date is required.`}</FieldError>
                                ))}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="birthTimezone">Birth Place</FieldLabel>
                            <FieldDescription>
                                Used to interpret your birth time correctly, including daylight
                                saving time.
                            </FieldDescription>
                            <Controller
                                name="timezone"
                                control={control}
                                render={({ field }) => (
                                    <TimezoneSelect
                                        value={field.value}
                                        onChange={(tz: ITimezoneOption) =>
                                            field.onChange(tz?.value ?? '')
                                        }
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                backgroundColor: 'var(--background)',
                                                borderColor: errors.timezone
                                                    ? 'var(--destructive)'
                                                    : 'var(--input)',
                                                boxShadow: 'none',
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: 'var(--background)',
                                                border: '1px solid var(--border)',
                                                zIndex: 50,
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                backgroundColor: 'var(--background)',
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </Field>
                        <FieldSeparator />
                        <div>
                            <p className="text-sm font-medium">Optional</p>
                            <p className="text-sm text-muted-foreground">
                                Add these if you know them for higher precision.
                            </p>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="birthTime">
                                Birth Time <span className="text-muted-foreground">(optional)</span>
                            </FieldLabel>
                            <Controller
                                name="birthTime"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value ?? undefined}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger id="birthTime">
                                            <SelectValue placeholder="Select time period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ja">23:00–01:00</SelectItem>
                                            <SelectItem value="chuk">01:00–03:00</SelectItem>
                                            <SelectItem value="in">03:00–05:00</SelectItem>
                                            <SelectItem value="myo">05:00–07:00</SelectItem>
                                            <SelectItem value="jin">07:00–09:00</SelectItem>
                                            <SelectItem value="sa">09:00–11:00</SelectItem>
                                            <SelectItem value="o">11:00–13:00</SelectItem>
                                            <SelectItem value="mi">13:00–15:00</SelectItem>
                                            <SelectItem value="sin">15:00–17:00</SelectItem>
                                            <SelectItem value="yu">17:00–19:00</SelectItem>
                                            <SelectItem value="sul">19:00–21:00</SelectItem>
                                            <SelectItem value="hae">21:00–23:00</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="birthLocation">
                                Birth Location
                                <span className="text-muted-foreground">(optional)</span>
                            </FieldLabel>
                            <Input
                                id="birthLocation"
                                autoComplete="off"
                                placeholder="City, Country"
                                {...register('birthLocation')}
                            />
                        </Field>
                        <FieldSeparator />

                        <Field>
                            <Button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                                size="lg"
                                disabled={isSubmitting}
                            >
                                Get Your Free Preview
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </form>
        </section>
    );
};

export default InputView;
