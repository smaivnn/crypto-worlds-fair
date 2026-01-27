import IllusionView from './IllusionView';

interface IllusionProps {
    lines: string[];
    copy: {
        title: string;
    };
}
const Illusion = ({ lines, copy }: IllusionProps) => {
    return <IllusionView lines={lines} copy={copy} />;
};

export default Illusion;
