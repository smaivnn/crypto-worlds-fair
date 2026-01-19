import MainHeroView from './MainHeroView';

interface MainHeroProps {
    copy: any;
}
const MainHero = ({ copy }: MainHeroProps) => {
    const mainHeroViewProps = { copy };
    return <MainHeroView {...mainHeroViewProps} />;
};

export default MainHero;
