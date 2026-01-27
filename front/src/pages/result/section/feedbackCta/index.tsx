import FeedbackCtaView from './FeedbackCtaView';

type FeedbackCtaProps = {
    onClick: () => void;
    label: string;
    tag: string;
    disabled?: boolean;
};

const FeedbackCta = ({ onClick, label, tag, disabled }: FeedbackCtaProps) => {
    return <FeedbackCtaView onClick={onClick} label={label} tag={tag} disabled={disabled} />;
};

export default FeedbackCta;
