import IntroView from './IntroView';

interface IntroProps {
    copy: any;
}
const Intro = ({ copy }: IntroProps) => {
    return <IntroView copy={copy} />;
};

export default Intro;
