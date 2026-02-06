import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import Auth from "../../api/auth";
import { UserTypes } from "../../config/constants";
import FrontendRoutes from "../../config/frontendRoutes";
import { IAuthResponse } from "../../config/types/APICustomResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../shared/contexts/UserContextProvider";
import { mapAuthResponseToUserInfo } from "../../utils/authUtils";
import logo from "../../assets/logo.png";
import { LinkDuo } from "../../ui/Elements/LinkDuo";
import ResendConfirmationEmailButton from "./ResendConfirmationEmailButton";

export enum VerifyAccountType {
    PENDING_EMAIL_VERIFICATION,
    PENDING_TEAM_APPROVAL,
}

interface VerifyAccountProps {
    verificationType: VerifyAccountType;
}

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    img: {
        marginLeft: "35%",
        marginBottom: "10%",
    },
    text: {
        wordSpacing: 5,
    },
    textWrapper: {},
    innerContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

// Post-sign up page stating that account is pending approval or pending email verification.
export const VerifyAccount: React.FC<VerifyAccountProps> = ({
    verificationType,
}) => {
    const history = useHistory();
    const styles = useStyles();
    const [resent, setResent] = useState<boolean>(false);
    const { userInfo, setUserInfo } = useContext(UserInfoContext)!;

    useEffect(() => {
        const checkIfVerified = async (
            accessToken: string,
            type: UserTypes
        ) => {
            await Auth.checkIfVerified(accessToken, type)
                .then((res) => {
                    const authResponse: IAuthResponse = res.data;

                    if (authResponse.user.isVerified) {
                        // set new user info
                        const userInfo: UserInfo =
                            mapAuthResponseToUserInfo(authResponse);

                        setUserInfo(userInfo);

                        // the user is actually verified, so move to dashboard.
                        history.replace(FrontendRoutes.DASHBOARD_ROUTE);
                    }
                })
                .catch(() => {
                    // user is not verified, page continues as normal.
                });
        };

        checkIfVerified(userInfo!.accessToken, userInfo!._type);
    }, [userInfo, history, setUserInfo]);

    return (
        <div className={styles.root}>
            <div className={styles.img}>
                <img alt="" src={logo} height="100px" />
            </div>

            <div className={styles.textWrapper}>
                {verificationType ===
                VerifyAccountType.PENDING_EMAIL_VERIFICATION ? (
                    <div className={styles.innerContainer}>
                        <Typography>
                            We have sent a confirmation email to your email
                            address! Please click the link in the email to start
                            using our platform.
                        </Typography>
                        <br></br>
                        <br></br>
                        <br></br>
                        <ResendConfirmationEmailButton />
                    </div>
                ) : (
                    <Typography>
                        Please wait while our team verifies your application. We
                        will send you a confirmation email shortly!
                    </Typography>
                )}
            </div>
        </div>
    );
};
