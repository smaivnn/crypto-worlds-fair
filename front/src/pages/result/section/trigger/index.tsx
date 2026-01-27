import TriggerView from './TriggerView';
interface TriggerProps {
    lines: string[];
    copy: {
        title: string;
    };
}
const Trigger = ({ lines, copy }: TriggerProps) => {
    return <TriggerView lines={lines} copy={copy} />;
};

export default Trigger;
