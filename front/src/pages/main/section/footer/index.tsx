import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { toLocalePath } from '@/lib/locale';
import FooterView from './FooterView';

interface FooterProps {
    copy: any;
}
const Footer = ({ copy }: FooterProps) => {
    const navigate = useNavigate();
    const { locale } = useI18n('en');
    const handleClick = (path: string) => {
        navigate(toLocalePath(path, locale));
    };
    const footerViewProps = { copy, onClick: handleClick };
    return <FooterView {...footerViewProps} />;
};

export default Footer;
