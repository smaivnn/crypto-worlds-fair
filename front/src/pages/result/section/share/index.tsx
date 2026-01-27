import ShareView from './ShareView';

type ShareProps = {
    onShare: () => void;
    label: string;
    hint?: string;
    disabled?: boolean;
};

const Share = ({ onShare, label, hint, disabled }: ShareProps) => {
    return <ShareView onShare={onShare} label={label} hint={hint} disabled={disabled} />;
};

export default Share;
