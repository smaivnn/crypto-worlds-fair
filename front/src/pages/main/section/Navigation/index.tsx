import NewAnalysisButtonView from './views/NewAnalysisButtonView';
import FullAnalysisButtonView from './views/FullAnalysisButtonView';
import NavigationButtonView from './views/NavigationButtonView';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
    copy: any;
    className?: string;
}
const Navigation = ({ copy }: NavigationProps) => {
    const navigate = useNavigate();
    const onClick = ({ path }: { path: string }) => {
        navigate(path);
    };

    const newAnalysisButtonViewProps = {
        copy: copy.newAnalysis,
        onClick,
    };
    const fullAnalysisButtonViewProps = {
        copy: copy.fullAnalysis,
        onClick,
    };
    const navigationButtonViewProps = {
        copy: copy.viewMore,
        onClick,
    };

    return (
        <section className="mt-auto px-4 space-y-4">
            {/* 새로운 분석 시작 버튼 */}
            <NewAnalysisButtonView {...newAnalysisButtonViewProps} />

            {/* about 버튼 */}
            <FullAnalysisButtonView {...fullAnalysisButtonViewProps} />

            {/* 추가 옵션 버튼 */}
            <NavigationButtonView {...navigationButtonViewProps} />
        </section>
    );
};

export default Navigation;
