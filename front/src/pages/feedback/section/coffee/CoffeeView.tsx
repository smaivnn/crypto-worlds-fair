import { TaavahCard } from '@/components/card';
import { SecondaryButton } from '@/components/button/SecondaryButton';

type CoffeeViewProps = {
    title: string;
    items: string[];
    buttonLabel: string;
};

const CoffeeView = ({ title, items, buttonLabel }: CoffeeViewProps) => {
    return (
        <TaavahCard className="p-4 space-y-3">
            <div className="text-sm font-semibold text-foreground">{title}</div>
            <ul className="space-y-2 text-sm text-foreground/70">
                {items.map((item) => (
                    <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <SecondaryButton type="button">{buttonLabel}</SecondaryButton>
        </TaavahCard>
    );
};

export default CoffeeView;
