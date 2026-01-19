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
        <section className="px-4 md:px-6 space-y-6 pb-8">
            <AppHeader centerMode="title" title="Your Inputs" onBack={onBack} />
            <Intro copy={copy.intro} />
            <ProfileForm copy={copy.form} />
            <PrivacyNote copy={copy.privacyNote} />
            {/* <ProfileFormCard /> */}
        </section>
    );
};

export default ProfileView;
