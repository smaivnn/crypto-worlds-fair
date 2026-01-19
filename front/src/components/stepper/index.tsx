import { cn } from '@/lib/utils';

type StepperProps = {
    current: number; // 1-based
    total: number;
    label?: string; // 예: "질문"
    hint?: string; // 예: "대충 답해도 충분합니다."
    className?: string;
};

export function Stepper({ current, total, label = 'STEP', hint, className }: StepperProps) {
    const clamped = Math.min(Math.max(current, 1), total);
    const pct = Math.round((clamped / total) * 100);

    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-end justify-between gap-3">
                <div className="flex flex-col">
                    <div className="text-[12px] tracking-[0.18em] text-white/60">
                        {label} {clamped}/{total}
                    </div>
                    {hint ? (
                        <div className="mt-1 text-[12px] leading-4 text-muted-foreground">
                            {hint}
                        </div>
                    ) : null}
                </div>

                <div className="text-[12px] text-white/60 tabular-nums">{pct}%</div>
            </div>

            <div className="mt-2 h-2 w-full rounded-full bg-white/8 border border-white/10 overflow-hidden">
                <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                    style={{ width: `${pct}%` }}
                />
            </div>

            {/* 미세한 tick (선택) */}
            <div className="mt-2 flex justify-between">
                {Array.from({ length: total }).map((_, i) => {
                    const idx = i + 1;
                    const active = idx <= clamped;
                    return (
                        <span
                            key={idx}
                            className={cn(
                                'h-[3px] w-full mx-[2px] rounded-full',
                                active ? 'bg-primary/70' : 'bg-white/10',
                            )}
                        />
                    );
                })}
            </div>
        </div>
    );
}
