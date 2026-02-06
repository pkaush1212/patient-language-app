import React from "react";
import FrontendRoute from "../../config/frontendRoutes";
import { LinkDuo } from "../../ui/Elements/LinkDuo";

const SignUpLink: React.FC<{}> = (props) => {
    return (
        <div className="SignUpLink">
            Don't have an account? &nbsp;
            <LinkDuo to={FrontendRoute.CREATE_ACCOUNT_ROUTE}>
                <span>Sign up</span>
            </LinkDuo>
        </div>
    );
};

export default SignUpLink;
