import { cn } from '@/lib/utils';

interface FooterViewProps {
    copy: any;
    className?: string;
    onClick?: (path: string) => void;
}
const FooterView = ({ copy, className, onClick }: FooterViewProps) => {
    return (
        <footer className={cn('w-full pt-4', className)}>
            <div className="flex items-center justify-center gap-3 text-[12px] text-white/55">
                <button
                    className="underline underline-offset-4 hover:text-white/80 transition"
                    onClick={() => onClick && onClick('/terms')}
                >
                    {copy.terms}
                </button>
                <span className="text-white/30">·</span>
                <button
                    className="underline underline-offset-4 hover:text-white/80 transition"
                    onClick={() => onClick && onClick('/disclaimer')}
                >
                    {copy.disclaimer}
                </button>
                <span className="text-white/30">·</span>
                <button
                    className="underline underline-offset-4 hover:text-white/80 transition"
                    onClick={() => onClick && onClick('/privacy')}
                >
                    {copy.privacy}
                </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-white/35">
                © {new Date().getFullYear()} TAAVAH. {copy.copyright}
            </p>
        </footer>
    );
};

export default FooterView;
