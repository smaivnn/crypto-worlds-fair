import { useEffect, useState } from 'react';
import { SCREEN_SIZE } from '@/constants/screen-size';

/**
 * 현재 브라우저의 width를 기준으로
 * mobile / tablet / laptop / desktop / full 중 하나를 반환하는 커스텀 훅
 */
export const useBreakpoint = () => {
    const [bp, setBp] = useState('desktop');

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;

            if (width < SCREEN_SIZE.mobile) setBp('mobile');
            else if (width < SCREEN_SIZE.tablet) setBp('tablet');
            else if (width < SCREEN_SIZE.laptop) setBp('laptop');
            else if (width < SCREEN_SIZE.desktop) setBp('desktop');
            else setBp('full');
        };

        updateSize(); // 초기 실행
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return bp; // 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'full'
};
