import React from 'react';

interface MarqueeProps {
    className?: string;
    children: React.ReactNode;
    speed?: number; // duration in seconds
    pauseOnHover?: boolean;
    reverse?: boolean;
}
export const Marquee = ({
    className,
    children,
    speed = 20,
    pauseOnHover = false,
    reverse = false,
}: MarqueeProps) => {
    return (
        <div className={`overflow-hidden ${pauseOnHover ? 'marquee-container' : ''} ${className}`}>
            <div
                className="marquee-content flex w-fit"
                style={{
                    animation: `marquee ${speed}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                <div className="flex gap-4 pr-4">{children}</div>

                {/* 복제본을 통해 연속적으로 보이도록 함 */}
                <div className="flex gap-4 pr-4" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
};
