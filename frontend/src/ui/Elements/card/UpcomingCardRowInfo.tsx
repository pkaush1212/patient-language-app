import React from "react";
import IconWithTextRight from "../IconWithTextRight";

export interface UpcomingCardRowInfoProps {
    icon: any;
    text: string;
}

const UpcomingCardRowInfo: React.FC<UpcomingCardRowInfoProps> = ({
    icon,
    text,
}) => {
    return <IconWithTextRight icon={icon} text={text} />;
};

export default UpcomingCardRowInfo;
