import './layout.css';
import { Outlet } from 'react-router-dom';
import { menuConfig } from '@/components/menu/Menu.data';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { MenuLeft } from '@/components/menu/left';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    screen?: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'full';
    withMenu?: boolean;
}
const Layout = ({ screen, withMenu = true }: LayoutProps) => {
    // SCREEN
    const autoScreenSize = useBreakpoint();
    const finalScreenSize = screen || autoScreenSize;

    // MENU
    const menuItems = menuConfig?.items;
    const menuPosition = menuConfig?.position;
    const collapsible = 'icon';
    const variant = 'inset';

    // CONTENT
    const pageStructure = (
        <div className={`root-container screen-${finalScreenSize}`}>
            {/* 헤더 추가 영역 */}
            <Header />
            <Outlet />
            {/* 푸터 추가 영역 */}
            <Footer />
        </div>
    );

    // If no menu is needed, return only the content
    if (!withMenu) {
        return pageStructure;
    }

    // LEFT MENU
    if (menuPosition === 'left') {
        const wrappedWithInset =
            variant === 'inset' ? <SidebarInset>{pageStructure}</SidebarInset> : pageStructure;
        return (
            <SidebarProvider>
                <MenuLeft menuItems={menuItems} collapsible={collapsible} variant={variant} />
                {wrappedWithInset}
            </SidebarProvider>
        );
    }

    // TOP MENU
    if (menuPosition === 'top') {
        return pageStructure;
    }
    return pageStructure;
};

export default Layout;
