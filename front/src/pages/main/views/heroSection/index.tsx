import Logo from '@/components/logo';

const HeroSectionView = () => {
    return (
        <section>
            <div className="w-full flex justify-center py-14">
                <button className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E88E5] via-[#FFD700] to-[#1E88E5] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-spin-slow" />
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#001E3C] to-[#0A1929] border-2 border-[#FFD700]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD700] to-white mt-6 tracking-tight">
                            OrinCode
                        </h1>
                    </div>
                </button>
            </div>
        </section>
    );
};

export default HeroSectionView;
