import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavigationView = () => {
    return (
        <div className="shrink-0">
            <Link
                to="/"
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
                aria-label="Back to Main"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Main</span>
            </Link>
        </div>
    );
};

export default NavigationView;
