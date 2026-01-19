// /src/components/common/TaavahTabs.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type TaavahTabsProps = {
    defaultValue: string;
    items: Array<{
        value: string;
        label: string;
        content: React.ReactNode;
    }>;
    className?: string;
};

export function TaavahTabs({ defaultValue, items, className }: TaavahTabsProps) {
    return (
        <Tabs defaultValue={defaultValue} className={cn('w-full', className)}>
            <TabsList
                className={cn('w-full h-11 p-1', 'bg-white/5 border border-white/10', 'rounded-xl')}
            >
                {items.map((t) => (
                    <TabsTrigger
                        key={t.value}
                        value={t.value}
                        className={cn(
                            'flex-1 h-9 rounded-lg',
                            'text-[13px] font-semibold tracking-[-0.01em]',
                            'text-white/70',
                            'data-[state=active]:text-white',
                            'data-[state=active]:bg-white/8',
                            'data-[state=active]:shadow-[0_10px_22px_rgba(0,0,0,0.35)]',
                            'data-[state=active]:border data-[state=active]:border-white/10',
                        )}
                    >
                        {t.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {items.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-4">
                    {t.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
