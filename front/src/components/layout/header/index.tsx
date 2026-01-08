import './header.css';
import type { MenuItem } from '@/components/menu';
import HeaderNav from './HeaderNav';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { clsx } from 'clsx';

const MobileContainer = ({ menuItems }: { menuItems: MenuItem[] }) => (
    <div className="mobile-header-container">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
                <SheetHeader>
                    <SheetTitle>
                        <Logo />
                    </SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto h-full">
                    <HeaderNav
                        menuItems={menuItems}
                        className="flex flex-col space-y-4 items-start"
                    />
                </div>
            </SheetContent>
        </Sheet>
    </div>
);
const FullContainer = ({ menuItems }: { menuItems?: MenuItem[] }) => {
    return (
        <div className="full-header-container">
            <Logo />
            <HeaderNav menuItems={menuItems} className="flex items-center space-x-4" />
        </div>
    );
};

const DefaultContainer = () => {
    return (
        <div className="flex items-center">
            <Logo />
        </div>
    );
};

interface HeaderProps {
    withMenu: boolean;
    mode: 'app' | 'document';
    menuPosition: 'top' | 'left';
    menuItems: MenuItem[];
}
const Header = ({ withMenu, mode, menuPosition, menuItems }: HeaderProps) => {
    return (
        <header
            className={clsx(
                'z-50 w-full border border-border/50',
                mode === 'app' ? 'bg-background/90 backdrop-blur-md' : 'fixed top-0 left-0',
            )}
        >
            <div className="w-full mx-auto px-12 py-4 header-cq">
                {/* 상단메뉴 */}
                {menuPosition === 'top' && withMenu && (
                    <>
                        {<MobileContainer menuItems={menuItems} />}
                        {<FullContainer menuItems={menuItems} />}
                    </>
                )}

                {/* 메뉴없을떄 */}
                {!withMenu && <DefaultContainer />}
            </div>
        </header>
    );
};

export default Header;
