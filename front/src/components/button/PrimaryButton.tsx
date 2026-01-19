import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function PrimaryButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    return (
        <Button
            className={cn(
                'w-full rounded-xl font-semibold',
                'tracking-[-0.01em]',
                'shadow-[0_10px_22px_rgba(0,0,0,0.45)]',
                'active:translate-y-px transition',
                className,
            )}
            {...props}
        />
    );
}
