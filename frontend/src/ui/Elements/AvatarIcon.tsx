import React from "react";
import { Avatar } from "@material-ui/core";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";

interface AvatarIconProps {
    size?: "small" | "large" | "";
    style?: React.CSSProperties;
    content;
    radiusSize?: number;
}

const AvatarIcon: React.FC<AvatarIconProps> = ({
    size = "small",
    content,
    style = { maxHeight: "90%" },
    radiusSize = 42,
}) => {
    const styles = useDynamicAvatarStyles({ size: radiusSize });

    return (
        <Avatar classes={styles} sizes={size} style={style}>
            {content}
        </Avatar>
    );
};

export default AvatarIcon;
