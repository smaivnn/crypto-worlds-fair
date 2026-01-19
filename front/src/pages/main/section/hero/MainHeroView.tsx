import { cn } from '@/lib/utils';

interface HeroViewProps {
    copy: any;
    className?: string;
}
const HeroView = ({ copy, className }: HeroViewProps) => {
    return (
        <section
            className={cn(
                'flex flex-col items-center text-center py-8 hero-gradient rounded-xl px-6 py-10',
                className,
            )}
        >
            <div className="text-[12px] tracking-[0.18em] text-white/60">{copy.eyebrow}</div>

            {/* logo section */}
            <div>
                <img
                    src={'/images/logo_star.svg'}
                    alt="Logo"
                    className="mx-auto h-12 w-auto mt-4"
                />
            </div>
            <h1
                className={cn(
                    'mt-2 font-semibold tracking-[-0.03em]',
                    'text-[30px] leading-[34px]',
                )}
            >
                {copy.titleTop} <span className="text-primary">{copy.titleAccent}</span>{' '}
                {copy.titleBottom}
            </h1>

            <p className="mt-3 whitespace-pre-line text-[14px] leading-[20px] text-muted-foreground">
                {copy.sub}
            </p>

            <div className="mt-5 h-[1px] w-full bg-white/10" />
        </section>
    );
};

export default HeroView;
