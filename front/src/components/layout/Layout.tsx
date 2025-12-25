import './layout.css';
import { Outlet } from 'react-router-dom';
import { menuConfig } from '@/components/menu/Menu.data';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
    screen?: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'full';
    withHeader?: boolean;
    withMenu?: boolean;
    withFooter?: boolean;
}
const Layout = ({ screen, withHeader = true, withMenu = true, withFooter = true }: LayoutProps) => {
    // SCREEN
    const autoScreenSize = useBreakpoint();
    const finalScreenSize = screen || autoScreenSize;

    // MENU
    const menuItems = menuConfig?.items || [];
    const menuPosition = menuConfig?.position || 'top';
    // PAGE STRUCTURE
    return (
        <div className={`root-container screen-${finalScreenSize}  `}>
            {/* 헤더 */}
            {withHeader && (
                <Header withMenu={withMenu} menuPosition={menuPosition} menuItems={menuItems} />
            )}
            {/* 메인 컨텐츠 */}
            {<Outlet />}
            {/* 푸터 */}
            {withFooter && <Footer />}
        </div>
    );
};

export default Layout;
