export interface UpcomingCardSideTextProps {
    color: string;
    text: string;
}

const UpcomingCardSideText: React.FC<UpcomingCardSideTextProps> = ({
    color,
    text,
}) => {
    return <span style={{ color }}>{text}</span>;
};

export default UpcomingCardSideText;
