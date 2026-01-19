import * as React from 'react';
import { cn } from '@/lib/utils';

type ScreenTitleProps = {
    title: string;
    sub?: string;
    right?: React.ReactNode;
    className?: string;
};

export function ScreenTitle({ title, sub, right, className }: ScreenTitleProps) {
    return (
        <div className={cn('flex items-start justify-between gap-3', className)}>
            <div>
                <h1 className="text-[20px] leading-6 font-semibold tracking-[-0.02em]">{title}</h1>
                {sub ? (
                    <p className="mt-1.5 text-[13px] leading-[18px] text-muted-foreground">{sub}</p>
                ) : null}
            </div>
            {right ? <div className="mt-0.5">{right}</div> : null}
        </div>
    );
}
