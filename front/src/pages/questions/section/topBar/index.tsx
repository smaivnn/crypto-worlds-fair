import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';
import { TopBarView } from './TopBarView';

export function TopBar({
    step,
    total,
    answered,
}: {
    step: number;
    total: number;
    answered: number;
}) {
    const navigation = useNavigate();
    const { locale } = useI18n('en');
    const progress = Math.round((answered / total) * 100);
    const clamped = Math.max(0, Math.min(100, progress));
    const goTo = (path: string) => {
        navigation(toLocalePath(path, locale));
    };

    return <TopBarView step={step} total={total} goTo={goTo} clamped={clamped} />;
}
