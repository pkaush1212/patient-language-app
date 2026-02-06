import React, { useEffect, useState } from "react";
import LeftArtWithContentRight from "../../modules/layouts/LeftArtWithContentRight";
import ResetPasswordForm from "../../modules/auth/password/ResetPasswordForm";
import vector from "../../assets/onboarding_vector.png";
import { getTokenFromQuery } from "../../utils/authUtils";
import { useHistory } from "react-router";
import FrontendRoutes from "../../config/frontendRoutes";
import Helmet from "react-helmet";
import { RESET_PASS_TITLE } from "../../config/constants";

interface ResetPasswordPageProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
    const history = useHistory();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            await getTokenFromQuery()
                .then((token) => setToken(token))
                .catch((error) => {
                    history.push(FrontendRoutes.DASHBOARD_ROUTE);
                });
        };
        fetchToken();
    }, [history]);

    return (
        <div>
            <Helmet>
                <title>{RESET_PASS_TITLE}</title>
            </Helmet>
            {token && (
                <LeftArtWithContentRight
                    imgSrc={vector}
                    formContainerHeaderContent={<h1>Reset Password</h1>}
                    formContainer={<ResetPasswordForm token={token} />}
                />
            )}
        </div>
    );
};

export default ResetPasswordPage;
