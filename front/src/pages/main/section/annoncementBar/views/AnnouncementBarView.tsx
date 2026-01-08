import { Marquee } from '@/components/marquee';

interface AnnouncementBarViewProps {
    message: string[];
}
const AnnouncementBarView = ({ message }: AnnouncementBarViewProps) => {
    return (
        <section className="w-full whitespace-nowrap border-y border-accent/80 shadow-sm bg-secondary/90 backdrop-blur">
            <Marquee speed={40} className="w-full py-2">
                {message.map((msg, i) => (
                    <div key={i} className="inline-flex items-center">
                        <p className="inline-flex items-center gap-2 px-3 font-medium tracking-wide text-text-secondary">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/80" />
                            <span className="uppercase ">{msg}</span>
                        </p>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default AnnouncementBarView;
