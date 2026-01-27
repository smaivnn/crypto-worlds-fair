import LegalPageView, { type LegalCopy } from '../legal/LegalPageView';

type TermsPageViewProps = {
    copy: LegalCopy;
};

const TermsPageView = ({ copy }: TermsPageViewProps) => {
    return <LegalPageView copy={copy} />;
};

export default TermsPageView;
