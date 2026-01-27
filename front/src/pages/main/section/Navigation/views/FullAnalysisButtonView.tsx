import IconTextButton from '@/components/button/IconTextButton';
import { Crown, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';

interface FullAnalysisButtonViewProps {
    copy: any;
    onClick?: ({ path }: { path: string }) => void;
}
const FullAnalysisButtonView = ({ copy, onClick }: FullAnalysisButtonViewProps) => {
    const { locale } = useI18n('en');

    // TODO(LAUNCH_UNLOCK_PREMIUM): 유료/프리미엄 오픈 시 아래 값을 false로 바꾸고,
    // 아래 render 분기에서 Link(또는 onClick) 경로 이동을 다시 활성화하세요.
    const IS_LOCKED = true;

    return (
        <IconTextButton
            fitContent={true}
            className={clsx(
                'group',
                'py-2',
                'bg-card text-foreground',
                'border border-accent/40',
                'shadow-lg',
                'transition-all duration-200',
                IS_LOCKED
                    ? 'opacity-60 cursor-not-allowed pointer-events-none'
                    : 'hover:border-accent/70 hover:bg-card/95 hover:-translate-y-0.5',
                IS_LOCKED ? undefined : 'active:translate-y-0 active:scale-[0.99]',
            )}
            left={<Crown className={clsx('h-5 w-5 text-accent', IS_LOCKED && 'opacity-60')} />}
            right={
                <Lock
                    className={clsx('h-4 w-4', IS_LOCKED ? 'text-muted-foreground' : 'opacity-0')}
                />
            }
            disabled={IS_LOCKED}
        >
            {/* TODO(LAUNCH_UNLOCK_PREMIUM): IS_LOCKED=false로 바꾸면 아래 Link가 활성화됩니다. */}
            {IS_LOCKED ? (
                <span className="block text-center">
                    <span className="text-lg font-medium">{copy.title}</span>
                    <span className="block text-xs mt-1 opacity-60">{copy.caption}</span>
                </span>
            ) : (
                <Link
                    to={toLocalePath('/premium', locale)}
                    className="block"
                    onClick={() => onClick?.({ path: '/premium' })}
                >
                    <span className="text-lg font-medium">{copy.title}</span>
                    <span className="block text-xs mt-1 opacity-60 group-hover:opacity-80">
                        {copy.caption}
                    </span>
                </Link>
            )}
        </IconTextButton>
    );
};

export default FullAnalysisButtonView;
