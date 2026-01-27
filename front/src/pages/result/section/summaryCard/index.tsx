import SummaryCardView from './SummaryCardView';

interface SummaryCardProps {
    mainDesire: string;
    subDesire: string;
    symbolSrc?: string;
    symbolAlt?: string;
    userQuote: string;
    engineLine: string;
    styleLine: string;
    tags: string[];
}
const SummaryCard = ({
    mainDesire,
    subDesire,
    symbolSrc,
    symbolAlt,
    userQuote,
    engineLine,
    styleLine,
    tags,
}: SummaryCardProps) => {
    const summaryCardProps = {
        mainDesire,
        subDesire,
        symbolSrc,
        symbolAlt,
        userQuote,
        engineLine,
        styleLine,
        tags,
    };
    return <SummaryCardView {...summaryCardProps} />;
};

export default SummaryCard;
