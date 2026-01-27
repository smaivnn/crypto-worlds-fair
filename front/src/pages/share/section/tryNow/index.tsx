import TryNowView from './TryNowView';

interface TryNowProps {
    onClick: () => void;
    copy: {
        title: string;
        subtitle: string;
        cta: string;
    };
}

const TryNow = ({ onClick, copy }: TryNowProps) => {
    return <TryNowView onClick={onClick} copy={copy} />;
};

export default TryNow;
