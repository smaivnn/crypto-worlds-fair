import { Link } from 'react-router-dom';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { MenuItem, SubMenuItem } from '@/components/menu';
import { ChevronRight, CircleSmall } from 'lucide-react';

interface MenuGroupProps {
    label?: string;
    menuItems: MenuItem[];
}
const MenuGroup = ({ label, menuItems }: MenuGroupProps) => {
    const currentPath = window.location.pathname;
    const isActive = (path: string) => {
        return currentPath.startsWith(path);
    };

    const CollapsableMenu = (menu: MenuItem) => {
        if (menu.isHidden) return null;
        return (
            <Collapsible
                key={menu.title}
                asChild
                className="group/collapsible"
                defaultOpen={isActive(menu.path)}
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={menu.title}>
                            {(menu.icon && <menu.icon />) || <CircleSmall />}
                            <span>{menu.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {menu.subList?.map((subMenu: SubMenuItem) => {
                                if (subMenu.isHidden) return null;
                                return (
                                    <SidebarMenuSubItem key={subMenu.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link to={`${menu.path}${subMenu.path}`}>
                                                <span>{subMenu.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                );
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    };

    /**
     * subMenu가 없는 기본 메뉴 아이템 렌더링
     */
    const DefaultMenu = (menu: MenuItem) => {
        if (menu.isHidden) return null;
        return (
            <SidebarMenuItem key={menu.title}>
                <SidebarMenuButton asChild tooltip={menu.title}>
                    <Link to={menu.path}>
                        {(menu.icon && <menu.icon />) || <CircleSmall />}
                        <span>{menu.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    };

    const RenderMenu = (menu: MenuItem) => {
        if (menu.subList && menu.subList.length > 0) {
            return CollapsableMenu(menu);
        }
        return DefaultMenu(menu);
    };

    return (
        <SidebarGroup>
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <SidebarMenu>{menuItems.map((item: MenuItem) => RenderMenu(item))}</SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default MenuGroup;
