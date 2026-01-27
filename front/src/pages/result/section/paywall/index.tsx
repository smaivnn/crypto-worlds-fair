import PaywallView from './PaywallView';

interface PaywallProps {
    paywallCTA: string;
    note: string;
}
const Paywall = ({ paywallCTA, note }: PaywallProps) => {
    return <PaywallView paywallCTA={paywallCTA} note={note} />;
};

export default Paywall;
