import DisclaimerPageView from './DisclaimerPageView';
import { useI18n } from '@/hooks/useI18n';
import { disclaimerCopy } from '@/i18n/disclaimer.copy';

type DisclaimerCopy = typeof disclaimerCopy.en;

const DisclaimerPage = () => {
    const { locale } = useI18n('en');
    const base: DisclaimerCopy = disclaimerCopy.en;
    const localized: DisclaimerCopy = (disclaimerCopy[locale] ??
        disclaimerCopy.en) as DisclaimerCopy;
    const copy = {
        ...base,
        ...localized,
    };

    return <DisclaimerPageView copy={copy} />;
};

export default DisclaimerPage;
