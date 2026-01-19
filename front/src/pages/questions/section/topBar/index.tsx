import { useNavigate } from 'react-router-dom';
import { TopBarView } from './TopBarView';

export function TopBar({ step, total }: { step: number; total: number }) {
    const navigation = useNavigate();
    const goTo = (path: string) => {
        navigation(path);
    };

    return <TopBarView step={step} total={total} goTo={goTo} />;
}
