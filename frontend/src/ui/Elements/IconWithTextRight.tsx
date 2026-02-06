import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

interface IconWithTextRightProps {
    icon: any;
    text: string;
    textStyle?: React.CSSProperties;
}

const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    rowIcon: {
        "& .MuiSvgIcon-root": {
            height: ".5em",
        },
    },
});

const IconWithTextRight: React.FC<IconWithTextRightProps> = ({
    icon,
    text,
    textStyle,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.rowIcon}>{icon}</div>
            <Typography style={textStyle}>{text}</Typography>
        </div>
    );
};

export default IconWithTextRight;
