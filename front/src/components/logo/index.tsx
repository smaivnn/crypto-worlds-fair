const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 ${className || ''}`}>
            <img src="/images/logo.svg" alt="OrinCode Logo" className="h-8 w-8" />
            <span className="text-2xl tracking-tight">OrinCode</span>
        </div>
    );
};

export default Logo;
