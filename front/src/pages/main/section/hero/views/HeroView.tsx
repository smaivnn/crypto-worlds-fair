const HeroView = () => {
    return (
        <section className="flex flex-col items-center text-center py-8 hero-gradient rounded-xl px-6 py-10">
            {/* Logo */}
            <div>
                <img src="/images/logo_bazi.png" alt="OrinCode Logo" className="h-56 w-56 mb-4" />
            </div>

            {/* Tagline */}
            <p className="text-[15px] leading-relaxed text-text-secondary">
                Curious about your future?
                <br />
                <span className="text-text-primary">Or the timing behind it?</span>
            </p>
        </section>
    );
};

export default HeroView;
