import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import type { MenuItem } from '@/components/menu';
import MenuLogo from './MenuLogo';
import MenuGroup from './MenuGroup';

/**
 * variant:
 * - inset: 콘텐츠 내부에 여백처럼 끼워진 형태
 */
interface MenuLeftProps {
    collapsible?: 'icon' | 'offcanvas' | 'none';
    variant?: 'sidebar' | 'floating' | 'inset';
    menuItems: MenuItem[];
}
export function MenuLeft({
    collapsible = 'icon',
    menuItems = [],
    variant = 'sidebar',
}: MenuLeftProps) {
    return (
        <Sidebar collapsible={collapsible} variant={variant}>
            {/* HEADER */}
            <SidebarHeader>
                <MenuLogo />
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                <MenuGroup menuItems={menuItems} />
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <SidebarTrigger />
            </SidebarFooter>

            {/* RAIL */}
            <SidebarRail />
        </Sidebar>
    );
}
