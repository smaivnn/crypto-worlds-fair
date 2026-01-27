import StructureView from './StructureView';

interface StructureProps {
    lines: string[];
    copy: {
        title: string;
        note: string;
    };
}
const Structure = ({ lines, copy }: StructureProps) => {
    return <StructureView lines={lines} copy={copy} />;
};

export default Structure;
