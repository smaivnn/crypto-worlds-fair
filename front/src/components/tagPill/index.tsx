import * as React from 'react';
import { cn } from '@/lib/utils';

type TagPillProps = React.HTMLAttributes<HTMLSpanElement> & {
    tone?: 'soft' | 'solid';
};

export function TagPill({ tone = 'soft', className, ...props }: TagPillProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 whitespace-nowrap',
                'rounded-full px-2.5 py-1 text-[12px] leading-[14px]',
                'tracking-[-0.01em]',
                tone === 'soft' && 'border border-white/15 bg-white/5 text-white/85',
                tone === 'solid' && 'border border-white/20 bg-white/8 text-white/90',
                className,
            )}
            {...props}
        />
    );
}
