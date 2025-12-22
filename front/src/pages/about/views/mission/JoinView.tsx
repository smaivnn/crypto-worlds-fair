import FantasyCard from '@/components/card/FantasyCard';
import { Link } from 'react-router-dom';

const JoinView = () => {
    return (
        <section className="py-16 px-6">
            <FantasyCard className="rounded-2xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    지금 <span className="text-primary">시작하세요</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    UNNONE과 함께 당신만의 판타지 세계를 만들어보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/signup"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                        회원가입하기
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                        플랫폼 둘러보기
                    </Link>
                </div>
            </FantasyCard>
        </section>
    );
};

export default JoinView;
