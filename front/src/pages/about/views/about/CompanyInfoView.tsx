import FantasyCard from '@/components/card/FantasyCard';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
    icon?: string;
    title: string;
    description: string;
}
const CompanyCardView = ({ icon, title, description }: CompanyCardProps) => {
    return (
        <FantasyCard className="p-8 hover:border-primary/50 transition-colors group">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    {icon ? <div>{icon}</div> : <BookOpen className="w-6 h-6 text-primary" />}
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
                    <Link
                        to="#"
                        className="inline-flex items-center text-primary hover:underline font-medium"
                    >
                        더 알아보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </FantasyCard>
    );
};

const CompanyInfoView = () => {
    return (
        <section className="py-20 px-6">
            {/* 섹션 헤더 */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                UNNONE에서 만나는 <span className="text-primary">판타지 세계</span>
            </h2>

            {/* 회사 카드 그리드 */}
            <div className="grid md:grid-cols-2 gap-6">
                <CompanyCardView
                    title="회사1"
                    description="강력한 N번째 회사에 대한 여러가지 설명이 이곳에 들어갑니다 간단하게 말입니다."
                />

                <CompanyCardView
                    title="회사2"
                    description="강력한 N번째 회사에 대한 여러가지 설명이 이곳에 들어갑니다 간단하게 말입니다."
                />

                <CompanyCardView
                    title="회사3"
                    description="강력한 N번째 회사에 대한 여러가지 설명이 이곳에 들어갑니다 간단하게 말입니다."
                />

                <CompanyCardView
                    title="회사4"
                    description="강력한 N번째 회사에 대한 여러가지 설명이 이곳에 들어갑니다 간단하게 말입니다."
                />
            </div>
        </section>
    );
};

export default CompanyInfoView;
