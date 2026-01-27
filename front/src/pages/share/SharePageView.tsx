import { AppHeader } from '@/components/appHeader';
import SummaryCard from './section/summaryCard';
import Structure from './section/structure';
import Trigger from './section/trigger';
import Illusion from './section/illusion';
import Intimacy from './section/intimacy';
import TryNow from './section/tryNow';
import type { AnalysisResultCopy } from '@/api/analysis.api';

interface SharePageViewProps {
    copy: AnalysisResultCopy;
    onTryNow: () => void;
    tendencyLabel?: string;
    tendencyRationale?: string;
    uiCopy: {
        tryNow: {
            title: string;
            subtitle: string;
            cta: string;
        };
        sections: {
            structure: { title: string; note: string };
            trigger: { title: string };
            illusion: { title: string };
            intimacy: {
                title: string;
                lockedLabel: string;
                tendencySentence: string;
                lockedLine: string;
                footnote: string;
            };
        };
    };
}
const SharePageView = ({
    copy,
    onTryNow,
    uiCopy,
    tendencyLabel,
    tendencyRationale,
}: SharePageViewProps) => {
    return (
        <section className="">
            <AppHeader title="Result" centerMode="title" />
            <section className="mx-auto w-full py-4 px-6 space-y-4">
                <SummaryCard
                    mainDesire={copy.summaryCard.mainDesire}
                    subDesire={copy.summaryCard.subDesire}
                    userQuote={copy.summaryCard.userQuote}
                    engineLine={copy.summaryCard.engineLine}
                    styleLine={copy.summaryCard.styleLine}
                    tags={copy.summaryCard.tags}
                />
                <Structure lines={copy.structure.lines} copy={uiCopy.sections.structure} />
                <Trigger lines={copy.trigger.lines} copy={uiCopy.sections.trigger} />
                <Illusion lines={copy.illusion.lines} copy={uiCopy.sections.illusion} />
                <Intimacy
                    lines={copy.intimacy.lines}
                    copy={uiCopy.sections.intimacy}
                    tendencyLabel={tendencyLabel}
                    tendencyRationale={tendencyRationale}
                />
                <TryNow onClick={onTryNow} copy={uiCopy.tryNow} />
            </section>
        </section>
    );
};

export default SharePageView;
