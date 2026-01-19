const WheelColumnView = ({
    items,
    value,
    onSelect,
    ariaLabel,
}: {
    items: string[];
    value?: string;
    onSelect: (v: string) => void;
    ariaLabel: string;
}) => {
    return (
        <div
            role="listbox"
            aria-label={ariaLabel}
            className="h-56 overflow-y-auto rounded-md border bg-background"
            style={{
                scrollSnapType: 'y mandatory',
            }}
        >
            {items.map((it) => {
                const active = it === value;
                return (
                    <button
                        key={it}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => onSelect(it)}
                        className={[
                            'w-full py-3 text-sm',
                            'hover:bg-accent hover:text-accent-foreground',
                            active
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-foreground',
                        ].join(' ')}
                        style={{ scrollSnapAlign: 'center' }}
                    >
                        {it}
                    </button>
                );
            })}
        </div>
    );
};

export default WheelColumnView;
