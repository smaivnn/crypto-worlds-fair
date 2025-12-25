import IconTextButton from '@/components/button/IconTextButton';

const NavigationButtonView = () => {
    return (
        <IconTextButton
            fitContent={true}
            className="py-2 transition-all backdrop-blur-sm bg-[#1E88E5]/20 border-2 border-[#1E88E5]/50 text-white hover:bg-[#1E88E5]/30 hover:border-[#1E88E5]/70 active:scale-[0.98]"
        >
            <span className="text-lg">More Options</span>
        </IconTextButton>
    );
};

export default NavigationButtonView;
