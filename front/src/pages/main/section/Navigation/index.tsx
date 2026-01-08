import NewAnalysisButtonView from './views/NewAnalysisButtonView';
import FullAnalysisButtonView from './views/FullAnalysisButtonView';
import NavigationButtonView from './views/NavigationButtonView';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const onClick = ({ path }: { path: string }) => {
        navigate(path);
    };
    return (
        <section className="mt-auto px-4 space-y-4">
            {/* 새로운 분석 시작 버튼 */}
            <NewAnalysisButtonView onClick={onClick} />

            {/* about 버튼 */}
            <FullAnalysisButtonView />

            {/* 추가 옵션 버튼 */}
            <NavigationButtonView />
        </section>
    );
};

export default Navigation;
