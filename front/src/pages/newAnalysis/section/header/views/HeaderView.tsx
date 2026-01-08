const HeaderView = () => {
    return (
        <div className="mt-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">New Analysis</h1>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
                Enter the required details and we’ll generate your result.
            </p>
            <p>No</p>
            {/* subtle divider */}
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
    );
};

export default HeaderView;
