import FooterView from './FooterView';

interface FooterProps {
    copy: any;
}
const Footer = ({ copy }: FooterProps) => {
    const footerViewProps = { copy };
    return <FooterView {...footerViewProps} />;
};

export default Footer;
