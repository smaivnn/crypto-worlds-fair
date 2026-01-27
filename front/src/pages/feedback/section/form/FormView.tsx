import { TaavahCard } from '@/components/card';
import { PrimaryButton } from '@/components/button/PrimaryButton';

type FormViewProps = {
    label: string;
    placeholder: string;
    helper: string;
    submitLabel: string;
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    honeypot: string;
    onHoneypotChange: (value: string) => void;
    isSubmitting?: boolean;
};

const FormView = ({
    label,
    placeholder,
    helper,
    submitLabel,
    onSubmit,
    value,
    onChange,
    honeypot,
    onHoneypotChange,
    isSubmitting,
}: FormViewProps) => {
    return (
        <TaavahCard className="p-4 space-y-3">
            <div className="text-sm font-medium text-foreground">{label}</div>
            <textarea
                className="min-h-[140px] w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                placeholder={placeholder}
                aria-label={label}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                value={honeypot}
                onChange={(event) => onHoneypotChange(event.target.value)}
            />
            <div className="text-[12px] text-foreground/55">{helper}</div>
            <PrimaryButton type="button" onClick={onSubmit} disabled={isSubmitting}>
                {submitLabel}
            </PrimaryButton>
        </TaavahCard>
    );
};

export default FormView;
