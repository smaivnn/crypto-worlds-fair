import HeroView from './HeroView';

type HeroProps = {
    title: string;
    subtitle: string;
};

const Hero = ({ title, subtitle }: HeroProps) => {
    return <HeroView title={title} subtitle={subtitle} />;
};

export default Hero;
