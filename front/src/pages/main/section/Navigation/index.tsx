import NewAnalysisButtonView from './views/NewAnalysisButtonView';
import FullAnalysisButtonView from './views/FullAnalysisButtonView';
import NavigationButtonView from './views/NavigationButtonView';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';

interface NavigationProps {
    copy: any;
    className?: string;
}
const Navigation = ({ copy }: NavigationProps) => {
    const navigate = useNavigate();
    const { locale } = useI18n('en');

    const onClick = ({ path }: { path: string }) => {
        navigate(toLocalePath(path, locale));
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
        <section className="mt-auto px-4 space-y-4 mb-8">
            {/* 새로운 분석 시작 버튼 */}
            <NewAnalysisButtonView {...newAnalysisButtonViewProps} />

            {/* 유료 분석 버튼 */}
            <FullAnalysisButtonView {...fullAnalysisButtonViewProps} />

            {/* 추가 옵션 버튼 */}
            <NavigationButtonView {...navigationButtonViewProps} />
        </section>
    );
};

export default Navigation;
