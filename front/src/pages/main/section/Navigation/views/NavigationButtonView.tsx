import IconTextButton from '@/components/button/IconTextButton';
import { clsx } from 'clsx';

interface NavigationButtonViewProps {
    copy: any;
    onClick?: ({ path }: { path: string }) => void;
}
const NavigationButtonView = ({ copy, onClick }: NavigationButtonViewProps) => {
    return (
        <IconTextButton
            fitContent={true}
            className={clsx(
                'py-2',
                'backdrop-blur-sm',
                'bg-muted/30 text-foreground',
                'border border-border',
                'transition-all duration-200',
                'hover:bg-muted/45 hover:border-border/80',
                'active:scale-[0.98]',
            )}
            onClick={() => onClick?.({ path: '/more-options' })}
        >
            <span className="text-lg">{copy.title}</span>
        </IconTextButton>
    );
};

export default NavigationButtonView;
