import TermsPageView from './TermsPageView';
import { useI18n } from '@/hooks/useI18n';
import { termsCopy } from '@/i18n/terms.copy';

type TermsCopy = typeof termsCopy.en;

const TermsPage = () => {
    const { locale } = useI18n('en');
    const base: TermsCopy = termsCopy.en;
    const localized: TermsCopy = (termsCopy[locale] ?? termsCopy.en) as TermsCopy;
    const copy = {
        ...base,
        ...localized,
    };

    return <TermsPageView copy={copy} />;
};

export default TermsPage;
