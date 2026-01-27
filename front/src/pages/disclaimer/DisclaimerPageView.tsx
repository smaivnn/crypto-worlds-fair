import LegalPageView, { type LegalCopy } from '../legal/LegalPageView';

type DisclaimerPageViewProps = {
    copy: LegalCopy;
};

const DisclaimerPageView = ({ copy }: DisclaimerPageViewProps) => {
    return <LegalPageView copy={copy} />;
};

export default DisclaimerPageView;
