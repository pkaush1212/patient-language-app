import { makeStyles } from "@material-ui/core";
import React from "react";
import { PALETTE } from "../../config/colors";

interface InnerContainerWithBorderProps {
    content;
}

const useStyles = makeStyles((theme) => ({
    container: {
        alignContent: "flex-start",
        backgroundColor: PALETTE.BACKGROUND_LIGHT_GREY,
    },
    upcomingContainer: {
        alignSelf: "center",
        marginLeft: "1%",
        marginRight: "1%",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "1%",
            paddingRight: "1%",
        },
    },
    innerContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: "2%",
    },
}));

const InnerContainerWithBorder: React.FC<InnerContainerWithBorderProps> = ({
    content,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.upcomingContainer}>
                <div className={styles.innerContainer}>{content}</div>
            </div>
        </div>
    );
};

export default InnerContainerWithBorder;
