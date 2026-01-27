import { TaavahCard } from '@/components/card';

interface IllusionViewProps {
    lines: string[];
    copy: {
        title: string;
    };
}
const IllusionView = ({ lines, copy }: IllusionViewProps) => {
    return (
        <TaavahCard className="group px-4 transition-all duration-300 hover:border-[#8B1E1E]/70 hover:bg-white/[0.02] hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="text-xs text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {copy.title}
            </div>
            <ul className="mt-2 space-y-2">
                {lines.map((t, i) => (
                    <li
                        key={i}
                        className="flex gap-2 text-sm text-white/80 leading-relaxed transition-colors duration-300 group-hover:text-white/90"
                    >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/35 transition-colors duration-300 group-hover:bg-[#8B1E1E]" />
                        <span>{t}</span>
                    </li>
                ))}
            </ul>
        </TaavahCard>
    );
};

export default IllusionView;
