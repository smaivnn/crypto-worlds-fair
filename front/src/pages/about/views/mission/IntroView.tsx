const IntroView = () => {
    return (
        <section className="py-32 px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* 설명 섹션 */}
                <div>
                    <span className="text-sm font-semibold text-primary tracking-wider">
                        OUR MISSION
                    </span>
                    <h2 className="text-4xl font-bold mt-4 mb-6 relative z-10">
                        창작자와 팬이
                        <br />
                        함께 만드는 세계
                    </h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
                        <p>UNNONE은 창작자들이 자유롭게 상상력을 펼칠 수 있는 공간을 제공합니다.</p>
                        <p>만들어진 세계는 현실과 이어져 다양한 이벤트를 발생시킵니다.</p>
                        <p>
                            우리는 모든 판타지 컨텐츠가 존중받고, 판타지가 현실이 되는 세상을
                            꿈꿉니다.
                        </p>
                    </div>
                </div>

                {/* 이미지 섹션 */}
                <div className="relative">
                    <div className="fantasy-orb w-full max-w-md aspect-square rounded-2xl rotate-orb absolute inset-0 m-auto opacity-50" />
                </div>
            </div>
        </section>
    );
};

export default IntroView;
