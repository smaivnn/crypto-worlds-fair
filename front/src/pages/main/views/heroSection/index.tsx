const HeroSectionView = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 bg-accent/30">
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-balance">
                Your structure, decoded
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
                Not fortune-telling. A system for understanding patterns, tendencies, and timing
                through the ancient Four Pillars framework.
            </p>
        </section>
    );
};

export default HeroSectionView;
