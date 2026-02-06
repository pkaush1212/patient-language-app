import React from "react";
import { makeStyles } from "@material-ui/core";

interface LeftArtWithContentRightProps {
    imgSrc: string;
    formContainerHeaderContent?;
    formContainer;
}

const useStyles = makeStyles((theme) => ({
    centeredContainer: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
    },
    artWrapper: {
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        maxWidth: "50%",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    art: {
        width: "85%",
        height: "100vh",
    },
    formContainer: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        maxWidth: "1080px",
        paddingTop: "16%",
        marginLeft: "5%",
        marginRight: "5%",
        [theme.breakpoints.between("sm", "md")]: {
            marginLeft: "2%",
            marginRight: "2%",
        },
    },
    form: {
        flex: 1,
        boxSizing: "content-box",
        flexDirection: "column",
        marginLeft: "5%",
        marginRight: "5%",
        [theme.breakpoints.down("sm")]: {
            flex: 1,
        },
    },
}));

const LeftArtWithContentRight: React.FC<LeftArtWithContentRightProps> = ({
    imgSrc,
    formContainerHeaderContent,
    formContainer,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.artWrapper}>
                <img alt="" className={styles.art} src={imgSrc} />
            </div>

            <div className={styles.formContainer}>
                {formContainerHeaderContent}
                <div className={styles.form}>{formContainer}</div>
            </div>
        </div>
    );
};

export default LeftArtWithContentRight;
