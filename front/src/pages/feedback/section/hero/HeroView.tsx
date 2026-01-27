type HeroViewProps = {
    title: string;
    subtitle: string;
};

const HeroView = ({ title, subtitle }: HeroViewProps) => {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">{title}</h2>
            <p className="text-sm text-foreground/70 leading-relaxed">{subtitle}</p>
        </div>
    );
};

export default HeroView;
