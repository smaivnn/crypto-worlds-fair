import { AppHeader } from '@/components/appHeader';
import { TaavahCard } from '@/components/card';

export type LegalSection = {
    title: string;
    body: readonly string[];
};

export type LegalCopy = {
    headerTitle: string;
    title: string;
    subtitle: string;
    updatedAt?: string;
    sections: readonly LegalSection[];
    contactLabel?: string;
};

type LegalPageViewProps = {
    copy: LegalCopy;
};

const LegalPageView = ({ copy }: LegalPageViewProps) => {
    return (
        <section>
            <AppHeader title={copy.headerTitle} centerMode="title" leftMode="home" />
            <section className="mx-auto w-full py-5 px-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground tracking-tight">
                        {copy.title}
                    </h2>
                    <p className="text-sm text-foreground/70 leading-relaxed">{copy.subtitle}</p>
                    {copy.updatedAt ? (
                        <div className="text-[12px] text-foreground/50">{copy.updatedAt}</div>
                    ) : null}
                </div>

                <div className="space-y-4">
                    {copy.sections.map((section) => (
                        <TaavahCard key={section.title} className="p-4 space-y-2">
                            <div className="text-sm font-semibold text-foreground">
                                {section.title}
                            </div>
                            <ul className="space-y-2 text-sm text-foreground/70 leading-relaxed">
                                {section.body.map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>
                        </TaavahCard>
                    ))}
                </div>

                {copy.contactLabel ? (
                    <div className="text-[12px] text-foreground/50">{copy.contactLabel}</div>
                ) : null}
            </section>
        </section>
    );
};

export default LegalPageView;
