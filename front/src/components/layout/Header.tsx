import { Link, useLocation } from 'react-router-dom';
import Logo from '../logo';

const LeftMenu = () => (
    <div className="space-x-2">
        <Link to="/">
            <Logo className="w-8 h-8" />
        </Link>
    </div>
);

const MiddleMenu = () => (
    <div className="hidden md:flex items-center space-x-8">{/* <Link /> 를 통해 요소 추가*/}</div>
);

interface RightMenuProps {
    activePath?: string;
}
const RightMenu = ({ activePath }: RightMenuProps) => {
    const activate = (to: string) => {
        const isActive = activePath === to;
        return isActive ? 'text-accent' : 'text-foreground/80 hover:text-accent';
    };

    return (
        <div className="flex items-center space-x-4">
            <Link to="/about" className={activate('/about')}>
                What is OrinCode?
            </Link>
            <Link to="/analysis" className={activate('/analysis')}>
                Full Analysis
            </Link>
            <Link to="/compatibility" className={activate('/compatibility')}>
                Compatibility
            </Link>
        </div>
    );
};

const Header = () => {
    const { pathname } = useLocation();

    return (
        <nav className="relative z-50 w-full border border-border/50">
            <div className="w-full mx-auto px-12 py-4">
                <div className="flex items-center justify-between">
                    {/* 로고 */}
                    <LeftMenu />

                    {/* 네비게이션 메뉴 */}
                    <MiddleMenu />

                    {/* 우측 액션 버튼들 */}
                    <RightMenu activePath={pathname} />
                </div>
            </div>
        </nav>
    );
};

export default Header;
