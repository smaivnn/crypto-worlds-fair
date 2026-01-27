import IconTextButton from '@/components/button/IconTextButton';
import { clsx } from 'clsx';
import { Lock } from 'lucide-react';

interface NavigationButtonViewProps {
    copy: any;
    onClick?: ({ path }: { path: string }) => void;
}
const NavigationButtonView = ({ copy, onClick }: NavigationButtonViewProps) => {
    // TODO(LAUNCH_UNLOCK_MORE_OPTIONS): 추가 옵션 오픈 시 false로 바꾸고 onClick을 다시 연결하세요.
    const IS_LOCKED = true;

    return (
        <IconTextButton
            fitContent={true}
            className={clsx(
                'py-2',
                'backdrop-blur-sm',
                'bg-muted/30 text-foreground',
                'border border-border',
                'transition-all duration-200',
                IS_LOCKED
                    ? 'opacity-60 cursor-not-allowed pointer-events-none'
                    : 'hover:bg-muted/45 hover:border-border/80',
                IS_LOCKED ? undefined : 'active:scale-[0.98]',
            )}
            right={
                <Lock
                    className={clsx('h-4 w-4', IS_LOCKED ? 'text-muted-foreground' : 'opacity-0')}
                />
            }
            disabled={IS_LOCKED}
            onClick={() => {
                if (IS_LOCKED) return;
                onClick?.({ path: '/more-options' });
            }}
        >
            <span className="text-lg">{copy.title}</span>
        </IconTextButton>
    );
};

export default NavigationButtonView;
