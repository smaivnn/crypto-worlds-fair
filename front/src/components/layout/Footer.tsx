import Logo from '../logo';

const Footer = () => {
    return (
        <footer className="border-t border-border mt-24">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col items-center gap-6">
                    <Logo />
                    <p className="text-sm text-muted-foreground text-center max-w-md">
                        For entertainment and self-reflection purposes. Not medical, financial, or
                        legal advice.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
