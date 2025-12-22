import { Home } from 'lucide-react';
import type { MenuItem, MenuPosition } from '@/components/menu';

export interface MenuConfig {
    position: MenuPosition;
    items: MenuItem[];
    hideMenuRoutes?: string[];
}
export const menuConfig: MenuConfig = {
    position: 'left',
    items: [
        {
            path: '/',
            title: 'Home',
            description: '메인 페이지',
            icon: Home,
            isHidden: false,
        },
        {
            path: '/about',
            title: 'About',
            description: '소개 페이지',
            subList: [
                {
                    path: '/home1',
                    title: 'Overview1',
                    description: '개요 페이지',
                    isHidden: false,
                },
                {
                    path: '/home2',
                    title: 'Overview2',
                    description: '개요 페이지',
                    isHidden: false,
                },
            ],
            isHidden: false,
            isOpen: false,
        },
    ],
    hideMenuRoutes: ['not-found'],
};
