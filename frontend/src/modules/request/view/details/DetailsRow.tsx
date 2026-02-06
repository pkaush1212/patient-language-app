import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { PALETTE } from "../../../../config/colors";

interface DetailsRowProps {
    label: string;
    content;
}

const useStyles = makeStyles(() => ({
    row: {
        display: "flex",
        flex: 1,
        paddingTop: "2%",
        paddingLeft: "2%",
    },
    text: {
        color: PALETTE.TEXT_GREY,
    },
    content: {},
}));

const DetailsRow: React.FC<DetailsRowProps> = ({ label, content }) => {
    const styles = useStyles();

    return (
        <div className={styles.row}>
            <Typography className={styles.text}>{label} : &nbsp;</Typography>
            <div className={styles.content}>{content}</div>
        </div>
    );
};

export default DetailsRow;
