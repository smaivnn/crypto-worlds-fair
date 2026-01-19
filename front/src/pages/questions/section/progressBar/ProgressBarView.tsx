export function ProgressBarView({ value }: { value: number }) {
    const clamped = Math.max(0, Math.min(100, value));

    return (
        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <div
                className="h-full w-full bg-primary origin-left transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ transform: `scaleX(${clamped / 100})` }}
            />
        </div>
    );
}
