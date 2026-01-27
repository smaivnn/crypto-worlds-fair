import { AppHeader } from '@/components/appHeader';
import Hero from './section/hero';
import Form from './section/form';

type FeedbackCopy = {
    headerTitle: string;
    heroTitle: string;
    heroSubtitle: string;
    formLabel: string;
    formPlaceholder: string;
    formHelper: string;
    submitLabel: string;
    toastEmpty: string;
    toastCooldown: string;
    toastError: string;
    toastSuccess: string;
    coffeeTitle: string;
    coffeeItems: string[];
    coffeeButton: string;
};

type FeedbackPageViewProps = {
    copy: FeedbackCopy;
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    honeypot: string;
    onHoneypotChange: (value: string) => void;
    isSubmitting?: boolean;
};

const FeedbackPageView = ({
    copy,
    onSubmit,
    value,
    onChange,
    honeypot,
    onHoneypotChange,
    isSubmitting,
}: FeedbackPageViewProps) => {
    return (
        <section>
            <AppHeader title={copy.headerTitle} centerMode="title" leftMode="home" />
            <section className="mx-auto w-full py-5 px-6 space-y-6">
                <Hero title={copy.heroTitle} subtitle={copy.heroSubtitle} />
                <Form
                    label={copy.formLabel}
                    placeholder={copy.formPlaceholder}
                    helper={copy.formHelper}
                    submitLabel={copy.submitLabel}
                    onSubmit={onSubmit}
                    value={value}
                    onChange={onChange}
                    honeypot={honeypot}
                    onHoneypotChange={onHoneypotChange}
                    isSubmitting={isSubmitting}
                />
                {/* <Coffee
                    title={copy.coffeeTitle}
                    items={copy.coffeeItems}
                    buttonLabel={copy.coffeeButton}
                /> */}
            </section>
        </section>
    );
};

export default FeedbackPageView;
