import IconTextButton from '@/components/button/IconTextButton';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewAnalysisButtonView = () => {
    return (
        <IconTextButton
            fitContent={true}
            className="py-2 shadow-2xl bg-gradient-to-r from-[#F2C94C] via-[#E6B65C] to-[#E6B65C] text-[#001E3C] hover:scale-[1.02] active:scale-[0.98]"
            left={<Sparkles className="w-5 h-5" />}
        >
            <Link to="/new-analysis">
                <span className="font-bold text-lg">Start Your Reading</span>
                <span className="block text-xs font-medium mt-1 opacity-75">
                    3 Free Readings Available
                </span>
            </Link>
        </IconTextButton>
    );
};

export default NewAnalysisButtonView;
