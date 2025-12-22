import { type LucideIcon } from 'lucide-react';

export type MenuPosition = 'left' | 'top';

export interface MenuItem {
    path: string;
    title: string;
    description?: string;
    icon?: LucideIcon;
    subList?: SubMenuItem[];
    collapsed?: boolean;
    isHidden?: boolean;
    isOpen?: boolean;
}

export interface SubMenuItem {
    path: string;
    title: string;
    description?: string;
    icon?: LucideIcon;
    isHidden?: boolean;
}
