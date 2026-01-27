import { AppHeader } from '@/components/appHeader';
import Intro from './section/Intro';
import PrivacyNote from './section/privacyNote';
import ProfileForm from './section/form';

interface ProfileViewProps {
    copy: any;
    onBack: () => void;
}
const ProfileView = ({ copy, onBack }: ProfileViewProps) => {
    return (
        <section>
            <AppHeader centerMode="title" title="Your Inputs" onBack={onBack} />
            <section className="mx-auto w-full py-4 px-6 space-y-4">
                <Intro copy={copy.intro} />
                <ProfileForm copy={copy.form} />
                <PrivacyNote copy={copy.privacyNote} />
            </section>
        </section>
    );
};

export default ProfileView;
