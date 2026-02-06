import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { PALETTE } from "../../config/colors";

interface TextWithRightLabelProps {
    text: string;
}

const useStyles = makeStyles(() => ({
    heading: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: "2%",
        marginBottom: "1%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginLeft: "1%",
        "&::before": {
            content: '""',
            borderBottom: `1px solid ${PALETTE.PRIMARY_ALT}`,
            margin: "auto",
        },
        "&::after": {
            content: '""',
            marginLeft: "2%",
            flex: "1",
            borderBottom: `1px solid ${PALETTE.PRIMARY_ALT}`,
            margin: "auto",
        },
    },
}));

const TextWithRightLabel: React.FC<TextWithRightLabelProps> = ({ text }) => {
    const classes = useStyles();

    return <Typography className={classes.heading}>{text}</Typography>;
};

export default TextWithRightLabel;
