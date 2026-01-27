import LegalPageView, { type LegalCopy } from '../legal/LegalPageView';

type PrivacyPageViewProps = {
    copy: LegalCopy;
};

const PrivacyPageView = ({ copy }: PrivacyPageViewProps) => {
    return <LegalPageView copy={copy} />;
};

export default PrivacyPageView;
