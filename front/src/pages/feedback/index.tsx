import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { submitFeedback } from '@/api/feedback.api';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';
import { feedbackCopy } from '@/i18n/feedback.copy';
import FeedbackPageView from './FeedbackPageView';

type FeedbackCopy = typeof feedbackCopy.en;

const FeedbackPage = () => {
    const { locale } = useI18n('en');
    const base: FeedbackCopy = feedbackCopy.en;
    const localized: FeedbackCopy = (feedbackCopy[locale] ?? feedbackCopy.en) as FeedbackCopy;
    const mergedCopy = {
        ...base,
        ...localized,
    };
    const copy = {
        ...mergedCopy,
        coffeeItems: [...mergedCopy.coffeeItems],
    };

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const storageKey = useMemo(() => `feedback_sent_at_${locale}`, [locale]);
    const cooldownMs = 24 * 60 * 60 * 1000;

    const handleSubmit = async () => {
        if (isSubmitting) return;
        if (honeypot.trim()) return;

        const trimmed = message.trim();
        if (!trimmed) {
            toast(copy.toastEmpty);
            return;
        }

        const lastSentAt = Number(localStorage.getItem(storageKey));
        if (Number.isFinite(lastSentAt) && Date.now() - lastSentAt < cooldownMs) {
            toast(copy.toastCooldown);
            return;
        }

        setIsSubmitting(true);
        try {
            await submitFeedback({
                message: trimmed,
                locale,
                page: window.location.pathname,
                honeypot,
            });

            localStorage.setItem(storageKey, String(Date.now()));
            setMessage('');
            toast(copy.toastSuccess);
            window.setTimeout(() => {
                navigate(toLocalePath('/', locale));
            }, 800);
        } catch (error) {
            toast(copy.toastError);
        } finally {
            setIsSubmitting(false);
        }
    };

    const feedbackPageViewProps = {
        copy,
        onSubmit: handleSubmit,
        value: message,
        onChange: setMessage,
        honeypot,
        onHoneypotChange: setHoneypot,
        isSubmitting,
    };

    return <FeedbackPageView {...feedbackPageViewProps} />;
};

export default FeedbackPage;
