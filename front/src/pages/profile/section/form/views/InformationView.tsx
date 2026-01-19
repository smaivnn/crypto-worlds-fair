const InformationView = ({ copy }: { copy: any }) => {
    return (
        <div className="flex items-start justify-between gap-3">
            <div>
                <div className="text-[14px] font-semibold text-white/90">
                    {copy.informationTitle}
                </div>
                <div className="mt-1 text-[12px] text-white/55">{copy.informationDescription}</div>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/60">
                {copy.informationDeco}
            </span>
        </div>
    );
};

export default InformationView;
