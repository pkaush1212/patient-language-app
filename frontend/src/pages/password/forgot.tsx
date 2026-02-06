import React from "react";
import LeftArtWithContentRight from "../../modules/layouts/LeftArtWithContentRight";
import vector from "../../assets/onboarding_vector.png";
import { ForgotPassword } from "../../modules/auth/password/ForgotPassword";
import Helmet from "react-helmet";
import { FORGOT_PASS_TITLE } from "../../config/constants";

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>{FORGOT_PASS_TITLE}</title>
            </Helmet>
            <LeftArtWithContentRight
                imgSrc={vector}
                formContainer={<ForgotPassword />}
            />
        </React.Fragment>
    );
};

export default ForgotPasswordPage;
