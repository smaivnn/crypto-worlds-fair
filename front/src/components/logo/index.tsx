import { Link } from 'react-router-dom';

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 ${className || ''}`}>
            <img src="/images/logo.svg" alt="OrinCode Logo" className="h-8 w-8" />
            <span className="text-2xl tracking-tight">OrinCode</span>
        </Link>
    );
};

export default Logo;
