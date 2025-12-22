import React from 'react';

interface FantasyCardProps {
    children: React.ReactNode;
    className?: string;
}
const FantasyCard = ({ children, className }: FantasyCardProps) => {
    return <div className={`fantasy-card rounded-2xl ${className}`}>{children}</div>;
};

export default FantasyCard;
