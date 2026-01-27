import PrivacyPageView from './PrivacyPageView';
import { useI18n } from '@/hooks/useI18n';
import { privacyCopy } from '@/i18n/privacy.copy';

type PrivacyCopy = typeof privacyCopy.en;

const PrivacyPage = () => {
    const { locale } = useI18n('en');
    const base: PrivacyCopy = privacyCopy.en;
    const localized: PrivacyCopy = (privacyCopy[locale] ?? privacyCopy.en) as PrivacyCopy;
    const copy = {
        ...base,
        ...localized,
    };

    return <PrivacyPageView copy={copy} />;
};

export default PrivacyPage;
