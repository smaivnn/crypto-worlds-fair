import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function Divider({ className }: { className?: string }) {
    return <Separator className={cn('bg-white/10', className)} />;
}
