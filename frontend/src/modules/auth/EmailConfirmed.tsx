import { useSnackbar } from "notistack";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import Auth from "../../api/auth";
import { SNACK_EMAIL_VERIFIED } from "../../config/constants";
import FrontendRoutes from "../../config/frontendRoutes";
import { statusCodes } from "../../config/statusCodes";
import { IAuthResponse } from "../../config/types/APICustomResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../shared/contexts/UserContextProvider";
import {
    getTokenFromQuery,
    mapAuthResponseToUserInfo,
} from "../../utils/authUtils";

interface EmailConfirmedProps {}

// Component checked when user clicks confirm email verification.
export const EmailConfirmed: React.FC<EmailConfirmedProps> = () => {
    const history = useHistory();
    const { setUserInfo } = useContext(UserInfoContext);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = await getTokenFromQuery();
                await Auth.verifyEmail(token)
                    .then((res) => {
                        if (res.status === statusCodes.OK) {
                            const response: IAuthResponse = res.data;
                            const userInfo: UserInfo =
                                mapAuthResponseToUserInfo(response);
                            enqueueSnackbar(SNACK_EMAIL_VERIFIED, {
                                variant: "success",
                            });
                            setUserInfo(userInfo);
                        }
                    })
                    .catch(() => {
                        // error verifying email...reroute to verify email page.
                        history.replace(
                            FrontendRoutes.PENDING_VERIFICATION_ROUTE
                        );
                    });
            } catch {
                // can't get token from url...
                history.replace(FrontendRoutes.PENDING_VERIFICATION_ROUTE);
            }
        };

        verifyEmail();
    }, [history, setUserInfo]);

    // Will go to dashboard as soon as loaded.
    return <div></div>;
};
