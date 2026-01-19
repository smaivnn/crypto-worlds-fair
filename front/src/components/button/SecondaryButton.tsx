import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function SecondaryButton({ className, ...props }: React.ComponentProps<typeof Button>) {
    return (
        <Button
            variant="outline"
            className={cn(
                'w-full rounded-xl font-semibold',
                'border-white/20 text-foreground bg-transparent',
                'hover:bg-white/5 hover:text-foreground',
                'active:translate-y-px transition',
                className,
            )}
            {...props}
        />
    );
}
