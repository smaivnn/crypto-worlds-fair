import { AppHeader } from '@/components/appHeader';
import type { AnalysisResultCopy } from '@/api/analysis.api';
import SummaryCard from './section/summaryCard';
import Structure from './section/structure';
import Trigger from './section/trigger';
import Illusion from './section/illusion';
import Intimacy from './section/intimacy';
import Paywall from './section/paywall';
import Share from './section/share';
import FeedbackCta from './section/feedbackCta';

type ResultPageViewProps = {
    copy: AnalysisResultCopy;
    onShare: () => void;
    shareLabel: string;
    shareHint?: string;
    isShareCreating: boolean;
    tendencyLabel?: string;
    tendencyRationale?: string;
    feedbackCta: { tag: string; label: string };
    onFeedback: () => void;
    uiCopy: {
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
        paywall: { note: string };
        feedbackCta: { tag: string; label: string };
    };
};

const ResultPageView = ({
    copy,
    onShare,
    shareLabel,
    shareHint,
    isShareCreating,
    tendencyLabel,
    tendencyRationale,
    feedbackCta,
    onFeedback,
    uiCopy,
}: ResultPageViewProps) => {
    return (
        <section>
            <AppHeader title="Result" centerMode="title" rightMode="share" onRightClick={onShare} />
            <section className="mx-auto w-full py-4 px-6 space-y-4">
                <SummaryCard
                    mainDesire={copy.summaryCard.mainDesire}
                    subDesire={copy.summaryCard.subDesire}
                    userQuote={copy.summaryCard.userQuote}
                    engineLine={copy.summaryCard.engineLine}
                    styleLine={copy.summaryCard.styleLine}
                    tags={copy.summaryCard.tags}
                />
                <Share
                    onShare={onShare}
                    label={shareLabel}
                    hint={shareHint}
                    disabled={isShareCreating}
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
                <FeedbackCta onClick={onFeedback} label={feedbackCta.label} tag={feedbackCta.tag} />
                <Paywall paywallCTA={copy.paywallCTA} note={uiCopy.paywall.note} />
            </section>
        </section>
    );
};

export default ResultPageView;
