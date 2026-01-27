import { cn } from '@/lib/utils';
import { toLocalePath } from '@/lib/locale';
import { useI18n } from '@/hooks/useI18n';
import { ArrowLeft, Check, Home, MoreHorizontal, Share } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AppHeaderProps = {
    title?: string;
    showBack?: boolean;
    /**
     * 좌측 버튼의 의미/아이콘을 지정합니다.
     * - home: 홈으로 이동(기본값)
     * - back: 뒤로가기
     */
    leftMode?: 'home' | 'back';
    onBack?: () => void;
    centerMode?: 'logo' | 'title';
    rightMode?: 'none' | 'saved' | 'menu' | 'share';
    onRightClick?: () => void;
};

export function AppHeader({
    title = 'TAAVAH',
    showBack = true,
    leftMode = 'home',
    onBack,
    centerMode = 'logo',
    rightMode = 'none',
    onRightClick,
}: AppHeaderProps) {
    const navigate = useNavigate();
    const { locale } = useI18n('en');

    const handleLeft = () => {
        if (onBack) {
            onBack();
            return;
        }

        if (leftMode === 'back') {
            navigate(-1);
            return;
        }

        navigate(toLocalePath('/', locale));
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50',
                'bg-background/70 backdrop-blur-md',
                'border-b border-white/10',
            )}
        >
            <div className="mx-auto grid h-14 max-w-[520px] grid-cols-[48px_1fr_48px] items-center px-3">
                {/* Left */}
                <div className="flex items-center justify-start">
                    {showBack ? (
                        <button
                            onClick={handleLeft}
                            aria-label={leftMode === 'back' ? 'Back' : 'Home'}
                            className={cn(
                                'h-10 w-10 rounded-full grid place-items-center',
                                'border border-white/10 bg-white/[0.02]',
                                'text-foreground/85',
                                'transition-all duration-200',
                                'hover:bg-white/[0.05] hover:border-white/15',
                                'active:translate-y-px active:scale-[0.98]',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                            )}
                        >
                            {leftMode === 'back' ? (
                                <ArrowLeft className="h-5 w-5" />
                            ) : (
                                <Home className="h-5 w-5" />
                            )}
                        </button>
                    ) : (
                        <div className="h-10 w-10" />
                    )}
                </div>

                {/* Center */}
                <div className="flex items-center justify-center gap-2">
                    {centerMode === 'logo' ? (
                        <>
                            <div
                                className={cn(
                                    'h-7 w-7 rounded-full grid place-items-center',
                                    'border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
                                )}
                            >
                                <span className="text-[11px] font-semibold tracking-tight text-foreground/90">
                                    T
                                </span>
                            </div>
                            <div className="text-[12px] font-semibold tracking-[0.22em] text-foreground/90">
                                TAAVAH
                            </div>
                        </>
                    ) : (
                        <div className="max-w-[240px] truncate text-[14px] font-semibold opacity-95">
                            {title}
                        </div>
                    )}
                </div>

                {/* Right */}
                <div className="flex items-center justify-end">
                    {rightMode === 'none' ? (
                        <div className="h-10 w-10" />
                    ) : (
                        <button
                            onClick={onRightClick}
                            aria-label={rightMode === 'saved' ? 'Saved' : 'Menu'}
                            className={cn(
                                'h-10 w-10 rounded-full grid place-items-center',
                                'border border-white/10 bg-white/[0.02]',
                                'text-foreground/85',
                                'transition-all duration-200',
                                'hover:bg-white/[0.05] hover:border-white/15',
                                'active:translate-y-px active:scale-[0.98]',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                            )}
                        >
                            {rightMode === 'saved' ? (
                                <Check className="h-5 w-5" />
                            ) : rightMode === 'share' ? (
                                <Share className="h-5 w-5" />
                            ) : (
                                <MoreHorizontal className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
