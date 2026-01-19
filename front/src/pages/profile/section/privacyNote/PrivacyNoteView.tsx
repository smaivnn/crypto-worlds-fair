import { TaavahCard } from '@/components/card';
import { cn } from '@/lib/utils';
import React from 'react';

interface PrivacyNoteViewProps {
    copy: any;
}
const PrivacyNoteView = ({ copy }: PrivacyNoteViewProps) => {
    return (
        <section className={cn('w-full')}>
            <TaavahCard className="p-4">
                <div className="text-[13px] font-semibold text-white/85">{copy.title}</div>
                <p className="mt-2 text-[12px] leading-[18px] text-white/60">{copy.description}</p>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[12px] leading-[18px] text-white/65">
                        {copy.disclaimer.map((item: string, index: number) => (
                            <React.Fragment key={index}>
                                {item}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            </TaavahCard>
        </section>
    );
};

export default PrivacyNoteView;
