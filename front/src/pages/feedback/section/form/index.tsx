import FormView from './FormView';

type FormProps = {
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

const Form = ({
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
}: FormProps) => {
    return (
        <FormView
            label={label}
            placeholder={placeholder}
            helper={helper}
            submitLabel={submitLabel}
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            honeypot={honeypot}
            onHoneypotChange={onHoneypotChange}
            isSubmitting={isSubmitting}
        />
    );
};

export default Form;
