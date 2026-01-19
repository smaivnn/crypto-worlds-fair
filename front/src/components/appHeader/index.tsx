// /src/components/common/AppHeader.tsx
import { cn } from '@/lib/utils';
import { ChevronLeft, Check, MoreHorizontal } from 'lucide-react';

type AppHeaderProps = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    centerMode?: 'logo' | 'title';
    rightMode?: 'none' | 'saved' | 'menu';
    onRightClick?: () => void;
};

export function AppHeader({
    title = 'TAAVAH',
    showBack = true,
    onBack,
    centerMode = 'logo',
    rightMode = 'none',
    onRightClick,
}: AppHeaderProps) {
    return (
        <header
            className={cn(
                'sticky top-0 z-50',
                'bg-background/80 backdrop-blur-md',
                'border-b border-border',
            )}
        >
            <div className="mx-auto grid h-13 max-w-[520px] grid-cols-[48px_1fr_48px] items-center px-2">
                {/* Left */}
                <div className="flex items-center justify-start">
                    {showBack ? (
                        <button
                            onClick={onBack}
                            aria-label="Back"
                            className={cn(
                                'h-10 w-10 rounded-full',
                                'border border-border bg-white/5',
                                'grid place-items-center',
                                'active:translate-y-px transition',
                                'bg-primary/80 hover:bg-primary/90',
                            )}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    ) : (
                        <div className="h-10 w-10" />
                    )}
                </div>

                {/* Center */}
                <div className="flex items-center justify-center gap-2">
                    {centerMode === 'logo' ? (
                        <>
                            <div className="h-6 w-6 rounded-full border border-border/70 grid place-items-center">
                                <span className="text-[11px] font-semibold tracking-tight">T</span>
                            </div>
                            <div className="text-[13px] font-semibold tracking-[0.18em] opacity-95">
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
                                'h-10 w-10 rounded-xl',
                                'border border-border bg-white/5',
                                'grid place-items-center',
                                'active:translate-y-px transition',
                            )}
                        >
                            {rightMode === 'saved' ? (
                                <Check className="h-5 w-5" />
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
