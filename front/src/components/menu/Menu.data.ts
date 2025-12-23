import type { MenuItem, MenuPosition } from '@/components/menu';

/**
 * 메뉴 설정 인터페이스
 * 포지션: 'left' | 'top'
 * 옵션 목록:
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
        ],
        isHidden: false,
 */
export interface MenuConfig {
    position: MenuPosition;
    items: MenuItem[];
}
export const menuConfig: MenuConfig = {
    position: 'top',
    items: [
        {
            path: '/about',
            title: 'About',
            description: '소개 페이지',
            isHidden: false,
        },
        {
            path: '/analysis',
            title: 'Full Analysis',
            description: '상세 분석 페이지',
            isHidden: false,
        },
        {
            path: '/compatibility',
            title: 'Compatibility',
            description: '궁합 분석 페이지',
            isHidden: false,
        },
    ],
};
