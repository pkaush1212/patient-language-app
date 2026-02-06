import React, { useContext } from "react";
import {
    UserInfo,
    UserInfoContext,
} from "../../shared/contexts/UserContextProvider";
import { DASHBOARD_TITLE, UserTypes } from "../../config/constants";
import InterpreterDash from "../../modules/dashboard/interpreter/InterpreterDash";
import RequesterDash from "../../modules/dashboard/requester/RequesterDash";
import withBackground from "../../shared/hoc/withBackground";
import { Redirect } from "react-router";
import Helmet from "react-helmet";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const { userInfo } = useContext(UserInfoContext);

    const renderUserDashboard = (userInfo: UserInfo | null) => {
        switch (userInfo?._type) {
            case UserTypes.INTERPRETER:
                return <InterpreterDash />;
            case UserTypes.REQUESTER:
                return <RequesterDash />;
            default:
                // Error
                return <Redirect to="/login" />;
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{DASHBOARD_TITLE}</title>
            </Helmet>
            {renderUserDashboard(userInfo)}
        </React.Fragment>
    );
};

export default withBackground(Dashboard);
