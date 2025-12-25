import { Marquee } from '@/components/marquee';
const MESSAGES = Array.from({ length: 6 }, () => 'Free preview available');
const AnnouncementBarView = () => {
    return (
        <section className="w-full whitespace-nowrap bg-gradient-to-r from-[#C9A961] via-[#E8D4A0] to-[#C9A961] border-b border-black/10 shadow-sm">
            <Marquee speed={40} className="w-full py-2">
                {MESSAGES.map((msg, i) => (
                    <div key={i} className="inline-flex items-center">
                        <p className="inline-flex items-center gap-2 px-3 font-semibold tracking-wide text-slate-950/90 drop-shadow-sm">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-950/70" />
                            <span className="uppercase">{msg}</span>
                        </p>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default AnnouncementBarView;
