import FantasyCard from '@/components/card/FantasyCard';

interface StatCardProps {
    value: string;
    label: string;
}
const StatCard = ({ value, label }: StatCardProps) => (
    <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</div>
        <div className="text-muted-foreground">{label} </div>
    </div>
);

const StatView = () => {
    return (
        <section className="py-16 px-6">
            <FantasyCard className="p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatCard value="10K+" label="작품" />
                    <StatCard value="5K+" label="창작자" />
                    <StatCard value="50K+" label="사용자" />
                    <StatCard value="100K+" label="커뮤니티 활동" />
                </div>
            </FantasyCard>
        </section>
    );
};

export default StatView;
