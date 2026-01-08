import './layout.css';
import { Outlet } from 'react-router-dom';
import { menuConfig } from '@/components/menu/Menu.data';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Header from './header';
import Footer from './footer';
import { useEffect } from 'react';

type Screen = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'full';
type Mode = 'app' | 'document';
type Fit = 'fixed' | 'shrink';

/**
 * Layout Options
 *
 * mode:
 * - 'app'
 *   웹앱 화면 모드
 *   - 스크롤: main-content(컨테이너) 기준
 *   - html/body 스크롤 잠금
 *   - 전역 Header / Footer 없음 (페이지 단위로 직접 구성)
 *
 * - 'document'
 *   웹사이트/문서 모드
 *   - 스크롤: viewport(html) 기준
 *   - Header: fixed (상단 고정)
 *   - Footer: 문서 하단
 *
 * screen:
 * - 화면 프레임 크기 강제 지정 (반응형과 무관)
 * - mobile | tablet | laptop | desktop | full
 *
 * fit:
 * - 'shrink' : max-width 기준, 작은 화면에서는 자연스럽게 축소
 * - 'fixed'  : width 고정, 디바이스 프리뷰/디자인 검수용
 *
 * withHeader / withFooter:
 * - document 모드에서만 의미 있음
 * - app 모드에서는 기본적으로 사용하지 않음
 */
interface LayoutProps {
    screen?: Screen; // 강제 스크린 너비 설정
    mode: Mode; // app(컨테이너 스크롤) | document(body 스크롤)
    fit?: Fit; // fixed(폭 고정) | shrink(화면에 맞춤)
    withHeader?: boolean;
    withSidebar?: boolean;
    withFooter?: boolean;
}
const Layout = ({
    screen,
    mode = 'document',
    fit = 'shrink',
    withSidebar = false,
    withHeader = true,
    withFooter = true,
}: LayoutProps) => {
    // SCREEN
    const autoScreenSize = useBreakpoint();
    const finalScreenSize = screen || autoScreenSize;

    // MENU
    const menuItems = menuConfig?.items || [];
    const menuPosition = menuConfig?.position || 'top';

    // Global scrool mode (html attribute)
    useEffect(() => {
        const html = document.documentElement;
        html.dataset.scrollMode = mode;

        return () => {
            // cleanup: remove only if it still matches
            if (html.dataset.scrollMode === mode) {
                delete html.dataset.scrollMode;
            }
        };
    }, [mode]);

    // PAGE STRUCTURE
    return (
        <div
            className={`root-container`}
            data-screen={finalScreenSize}
            data-mode={mode}
            data-fit={fit}
        >
            {/* 헤더 */}
            {withHeader && mode === 'document' && (
                <Header
                    withMenu={withSidebar}
                    mode={mode}
                    menuPosition={menuPosition}
                    menuItems={menuItems}
                />
            )}
            {/* 메인 컨텐츠 */}
            <main className="main-content">{<Outlet />}</main>
            {/* 푸터 */}
            {withFooter && mode === 'document' && <Footer />}
        </div>
    );
};

export default Layout;
