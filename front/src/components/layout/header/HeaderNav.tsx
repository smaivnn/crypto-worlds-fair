import type { MenuItem } from '@/components/menu';
import { useModalStore } from '@/store/modalStore';
import { Link, useLocation } from 'react-router-dom';

interface LinkMenuProps {
    label: string;
    to: string;
    isActive: boolean;
}
const LinkMenu = ({ label, to, isActive }: LinkMenuProps) => {
    return (
        <Link
            to={to}
            className={`${isActive ? 'text-accent' : 'text-foreground/80 hover:text-accent'}`}
        >
            {label}
        </Link>
    );
};

interface ModalMenuProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}
const ModalMenu = ({ label, isActive, onClick }: ModalMenuProps) => {
    return (
        <button
            className={`${isActive ? 'text-accent' : 'text-foreground/80 hover:text-accent'}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

interface HeaderNavProps {
    className?: string;
    menuItems?: MenuItem[];
}
const HeaderNav = ({ className, menuItems }: HeaderNavProps) => {
    const { pathname } = useLocation();
    const isActive = (to: string) => pathname === to;
    const { openModal } = useModalStore();

    const handleAboutClick = () => {
        openModal({
            title: 'What OrinCode Is?',
            titleClassName: 'text-2xl tracking-tight',
            content: (
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed pt-4">
                    <p>
                        OrinCode translates Korean Four Pillars (사주팔자) into a modern analysis
                        tool. Rather than predicting the future, it maps patterns in your
                        personality structure and timing.
                    </p>
                    <p>
                        Every calculation is deterministic—the same input always produces the same
                        result. There's no mysticism, only structured interpretation based on
                        elements, seasons, and relationships.
                    </p>
                    <p>
                        Think of it as a framework for understanding yourself, not a crystal ball.
                        OrinCode offers possibilities, not certainties.
                    </p>
                </div>
            ),
        });
    };

    return (
        <div className={`${className || ''}`}>
            {menuItems?.map((item) =>
                item.path === '/about' ? (
                    <ModalMenu
                        key={item.path}
                        label={item.title}
                        isActive={isActive(item.path)}
                        onClick={handleAboutClick}
                    />
                ) : (
                    <LinkMenu
                        key={item.path}
                        label={item.title}
                        to={item.path}
                        isActive={isActive(item.path)}
                    />
                ),
            )}
        </div>
    );
};

export default HeaderNav;
