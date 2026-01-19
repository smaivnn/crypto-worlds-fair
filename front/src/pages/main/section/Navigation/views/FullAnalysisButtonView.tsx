import IconTextButton from '@/components/button/IconTextButton';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface FullAnalysisButtonViewProps {
    copy: any;
    onClick?: ({ path }: { path: string }) => void;
}
const FullAnalysisButtonView = ({ copy, onClick }: FullAnalysisButtonViewProps) => {
    return (
        <IconTextButton
            fitContent={true}
            className={clsx(
                'group',
                'py-2',
                'bg-card text-foreground',
                'border border-accent/40',
                'shadow-lg',
                'transition-all duration-200',
                'hover:border-accent/70 hover:bg-card/95 hover:-translate-y-0.5',
                'active:translate-y-0 active:scale-[0.99]',
            )}
            left={<Crown className="h-5 w-5 text-accent" />}
        >
            <Link to="/premium">
                <span className="text-lg font-medium">{copy.title}</span>
                <span className="block text-xs mt-1 opacity-60 group-hover:opacity-80">
                    {copy.caption}
                </span>
            </Link>
        </IconTextButton>
    );
};

export default FullAnalysisButtonView;
