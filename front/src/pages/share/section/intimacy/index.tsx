import IntimacyView from './IntimacyView';

interface IntimacyProps {
    lines: string[];
    copy: {
        title: string;
        lockedLabel: string;
        tendencySentence: string;
        lockedLine: string;
        footnote: string;
    };
    tendencyLabel?: string;
    tendencyRationale?: string;
}
const buildSentenceParts = (template: string, token: string) => {
    const placeholder = '{label}';
    const idx = template.indexOf(placeholder);
    if (idx < 0) {
        return null;
    }
    return {
        prefix: template.slice(0, idx),
        token,
        suffix: template.slice(idx + placeholder.length),
    };
};

const Intimacy = ({ lines, copy, tendencyLabel, tendencyRationale }: IntimacyProps) => {
    const token = tendencyLabel ? `"${tendencyLabel}"` : undefined;
    const tendencySentenceParts =
        token && copy.tendencySentence ? buildSentenceParts(copy.tendencySentence, token) : null;
    return (
        <IntimacyView
            lines={lines}
            copy={copy}
            tendencySentenceParts={tendencySentenceParts ?? undefined}
            tendencyRationale={tendencyRationale}
        />
    );
};

export default Intimacy;
