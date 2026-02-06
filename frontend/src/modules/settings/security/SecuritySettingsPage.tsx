import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import ResetPasswordForm from "../../auth/password/ResetPasswordForm";
import ResetPasswordLoggedInForm from "./ResetPasswordLoggedInForm";

interface SecuritySettingsPageProps {}

const useStyles = makeStyles(() => ({
    root: {
        overflow: "auto",
    },
    textContainer: {
        paddingTop: "2%",
        paddingBottom: "2%",
    },
}));

const SecuritySettingsPage: React.FC<SecuritySettingsPageProps> = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.textContainer}>
                <Typography>Enter old password and new password: </Typography>
            </div>
            <ResetPasswordLoggedInForm />
        </div>
    );
};

export default SecuritySettingsPage;
