import PrivacyNoteView from './PrivacyNoteView';

interface PrivacyNoteProps {
    copy: any;
}
const PrivacyNote = ({ copy }: PrivacyNoteProps) => {
    return <PrivacyNoteView copy={copy} />;
};

export default PrivacyNote;
