import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export function TaavahCard({ className, ...props }: React.ComponentProps<typeof Card>) {
    return (
        <Card
            className={cn(
                'bg-card text-card-foreground',
                'border border-border',
                'rounded-xl',
                'shadow-[var(--shadow-card)]',
                className,
            )}
            {...props}
        />
    );
}
