interface IntroViewProps {
    copy: any;
}
const IntroView = ({ copy }: IntroViewProps) => {
    return (
        <section className="w-full">
            <h1 className="mt-2 text-[22px] leading-[28px] font-semibold tracking-[-0.03em]">
                {copy.title}
            </h1>

            <p className="mt-2 text-[13px] leading-[19px] text-muted-foreground">
                {copy.description}
            </p>

            <div className="mt-4 h-[1px] w-full bg-white/10" />
        </section>
    );
};

export default IntroView;
