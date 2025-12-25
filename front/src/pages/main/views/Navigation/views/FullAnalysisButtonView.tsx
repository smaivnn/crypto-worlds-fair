import IconTextButton from '@/components/button/IconTextButton';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const FullAnalysisButtonView = () => {
    return (
        <IconTextButton
            fitContent={true}
            className="py-2 bg-white border-2 border-[#C9A961] text-[#0A1420] hover:bg-[#C9A961] hover:text-white shadow-lg hover:shadow-[#C9A961]/20 active:scale-[0.98] group"
            left={<Crown className="h-5 w-5" />}
        >
            <Link to="/premium">
                <span className="text-lg">View Full Analysis</span>
                <span className="block text-xs mt-1 opacity-60 group-hover:opacity-80">
                    Premium • $9.99
                </span>
            </Link>
        </IconTextButton>
    );
};

export default FullAnalysisButtonView;
