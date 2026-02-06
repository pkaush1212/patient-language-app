import { makeStyles, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import noResultsVector from "../../assets/404empty.png";
import useMobile from "../hooks/useMobile";

interface NoResults404SplashProps {
    message?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlockStart: "8%",
    },
    img: {
        display: "flex",
        justifyContent: "center",
    },
    message: {
        display: "flex",
        paddingTop: "2%",
        paddingBottom: "5%",
        justifyContent: "center",
    },
}));

const NoResults404Splash: React.FC<NoResults404SplashProps> = ({ message }) => {
    const styles = useStyles();
    const onMobileView = useMobile();

    return (
        <div className={styles.root}>
            <div className={styles.img}>
                {onMobileView ? (
                    <img alt="" src={noResultsVector} width="50%" />
                ) : (
                    <img alt="" src={noResultsVector} />
                )}
            </div>
            <div className={styles.message}>
                <Typography variant={onMobileView ? "subtitle1" : "h5"}>
                    {message}
                </Typography>
            </div>
        </div>
    );
};

export default NoResults404Splash;
