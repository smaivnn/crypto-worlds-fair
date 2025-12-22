const IntroView = () => {
    return (
        <section className="relative pt-32 pb-16 px-6">
            {/* 섹션 타이틀 */}
            <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary tracking-wider">
                    ABOUT UNNONE
                </span>
            </div>

            {/*큰 제목 */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
                <span className="text-foreground">모든 판타지가</span>
                <br />
                <span className="text-primary text-glow">모이는 곳</span>
            </h1>

            {/* 설명 텍스트 */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                UNNONE은 창작자와 팬들이 함께 만들어가는 판타지 플랫폼입니다. 어쩌구 저쩌구 세계관
                설명을 여기서 어느정도 길게 이어갑니다
            </p>
        </section>
    );
};

export default IntroView;
