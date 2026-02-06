import { Divider, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { SETTINGS_TITLE, UserTypes } from "../../config/constants";
import InnerContainerWithBorder from "../../modules/layouts/InnerContainerWithBorder";
import InterpreterProfileForm from "../../modules/settings/profile/InterpreterProfileForm";
import RequesterProfileForm from "../../modules/settings/profile/RequesterProfileForm";
import SecuritySettingsPage from "../../modules/settings/security/SecuritySettingsPage";
import SettingsMenu from "../../modules/settings/SettingsMenu";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";

interface SettingsPageProps {}

export type SettingsSubPages = "profile" | "security";

const useStyles = makeStyles((theme: Theme) => ({
    root: { display: "flex", flexDirection: "column" },
    title: {},
    titleText: {
        fontSize: 25,
        fontWeight: 600,
        paddingTop: "2%",
        paddingLeft: "2%",
        [theme.breakpoints.down("sm")]: {
            fontSize: 22,
        },
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "1%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    menuRoot: {
        flexGrow: 3,
        padding: "1%",
        marginRight: "1%",
        [theme.breakpoints.up("sm")]: {
            minWidth: "20vw",
            maxWidth: "20vw",
        },
    },
    divider: {
        background: "black",
    },
    subPageRoot: {
        flexGrow: 5,
        paddingLeft: "2%",
        paddingRight: "5%",
        marginTop: "2%",
        marginBottom: "2%",
    },
}));

const SettingsPage: React.FC<SettingsPageProps> = () => {
    const { userInfo } = useContext(UserInfoContext);

    const [activeSubPage, setActiveSubPage] =
        useState<SettingsSubPages>("profile");

    const styles = useStyles();

    return (
        <React.Fragment>
            <Helmet>
                <title>{SETTINGS_TITLE}</title>
            </Helmet>
            <InnerContainerWithBorder
                content={
                    <div className={styles.root}>
                        <div className={styles.title}>
                            <Typography className={styles.titleText}>
                                Your Settings
                            </Typography>
                        </div>
                        <div className={styles.mainContainer}>
                            <div className={styles.menuRoot}>
                                <SettingsMenu
                                    activeSubPage={activeSubPage}
                                    setActiveSubPage={setActiveSubPage}
                                />
                            </div>
                            <Divider
                                orientation="vertical"
                                flexItem
                                className={styles.divider}
                            />
                            <div className={styles.subPageRoot}>
                                {activeSubPage === "profile" &&
                                    (userInfo?._type ===
                                    UserTypes.INTERPRETER ? (
                                        <InterpreterProfileForm />
                                    ) : (
                                        <RequesterProfileForm />
                                    ))}
                                {activeSubPage === "security" && (
                                    <SecuritySettingsPage />
                                )}
                            </div>
                        </div>
                    </div>
                }
            />
        </React.Fragment>
    );
};

export default SettingsPage;
