import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface MenuLogoProps {
    icon?: string;
    text?: string;
}
const MenuLogo = ({ icon, text = 'logo' }: MenuLogoProps) => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <AvatarImage src="https://github.com/shadcn.png" className="rounded-md" />
                        <AvatarFallback>LG</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        {icon && <span className="truncate">{icon}</span>}
                        <span className="truncate font-semibold">{text}</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default MenuLogo;
