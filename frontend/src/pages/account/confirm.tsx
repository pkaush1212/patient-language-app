import React from "react";
import { EmailConfirmed } from "../../modules/auth/EmailConfirmed";

interface ConfirmAccountPageProps {}

const ConfirmAccountPage: React.FC<ConfirmAccountPageProps> = ({}) => {
    return <EmailConfirmed />;
};

export default ConfirmAccountPage;
