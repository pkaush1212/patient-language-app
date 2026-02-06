import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import Auth from "../../api/auth";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";

const ResendConfirmationEmailButton: React.FC<{}> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [resendEnabled, setResendEnabled] = useState<boolean>(true);

    const resendConfirmationEmail = () => {
        setResendEnabled(false);

        Auth.resendVerificationEmail(userInfo!.accessToken).then(() => {
            setTimeout(() => {
                setResendEnabled(true);
            }, 30000);
        });
    };

    return (
        <Button
            variant="contained"
            color="primary"
            disabled={!resendEnabled}
            onClick={resendConfirmationEmail}
        >
            {resendEnabled ? "Resend Confirmation Email?" : "Sent!"}
        </Button>
    );
};

export default ResendConfirmationEmailButton;
