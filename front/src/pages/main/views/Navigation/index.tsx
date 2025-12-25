import NewAnalysisButtonView from './views/NewAnalysisButtonView';
import FullAnalysisButtonView from './views/FullAnalysisButtonView';
import NavigationButtonView from './views/NavigationButtonView';

const Navigation = () => {
    return (
        <section className="mt-auto px-4 space-y-4">
            {/* 새로운 분석 시작 버튼 */}
            <NewAnalysisButtonView />

            {/* about 버튼 */}
            <FullAnalysisButtonView />

            {/* Full 분석 시작 버튼 */}
            <NavigationButtonView />

            {/* share 버튼 */}
        </section>
    );
};

export default Navigation;
