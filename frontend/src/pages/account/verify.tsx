import React, { useContext } from "react";
import { UserTypes, VERIFY_ACC_TITLE } from "../../config/constants";
import {
    VerifyAccount,
    VerifyAccountType,
} from "../../modules/auth/VerifyAccount";
import LeftArtWithContentRight from "../../modules/layouts/LeftArtWithContentRight";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import vector from "../../assets/onboarding_vector.png";
import Helmet from "react-helmet";

interface VerifyPageProps {}

const VerifyPage: React.FC<VerifyPageProps> = () => {
    const { userInfo } = useContext(UserInfoContext);

    const verificationType: VerifyAccountType =
        userInfo?._type === UserTypes.INTERPRETER
            ? VerifyAccountType.PENDING_TEAM_APPROVAL
            : VerifyAccountType.PENDING_EMAIL_VERIFICATION;

    return (
        <React.Fragment>
            <Helmet>
                <title>{VERIFY_ACC_TITLE}</title>
            </Helmet>
            <LeftArtWithContentRight
                imgSrc={vector}
                formContainer={
                    <VerifyAccount verificationType={verificationType} />
                }
            />
        </React.Fragment>
    );
};

export default VerifyPage;
