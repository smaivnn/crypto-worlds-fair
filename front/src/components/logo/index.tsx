import { Link } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';

const Logo = ({ className }: { className?: string }) => {
    const { locale } = useI18n('en');
    return (
        <Link to={toLocalePath('/', locale)} className={`flex items-center gap-2 ${className || ''}`}>
            <img src="/images/logo.svg" alt="OrinCode Logo" className="h-8 w-8" />
            <span className="text-2xl tracking-tight">OrinCode</span>
        </Link>
    );
};

export default Logo;
