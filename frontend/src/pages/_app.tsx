import React, { useContext, useEffect, useReducer, useState } from "react";
import Sidebar from "../modules/navigation/Sidebar";
import Navbar from "../modules/navigation/Navbar";
import { Switch, Route, Redirect } from "react-router";
import FrontendRoutes from "../config/frontendRoutes";
import { UserInfoContext } from "../shared/contexts/UserContextProvider";
import VerifyPage from "./account/verify";
import ConfirmAccountPage from "./account/confirm";
import Dashboard from "./dashboard/Dashboard";
import CalendarPage from "./calendar/calendar";
import RequestPage from "./request/[id]";
import MessagesPage from "./messages";
import { fetchUserDetails } from "../modules/account/fetchSelf";
import {
    initCometChat,
    loginUserToChat,
} from "../modules/chat/services/CometAuthServices";
import {
    IUserDetail,
    UserDetailsContext,
} from "../shared/contexts/UserDetailsContextProvider";
import SettingsPage from "./settings";

interface HomeProps {}

const HomeContainer: React.FC<HomeProps> = () => {
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const [userDetail, setUserDetail] = useState<IUserDetail | null>(null);

    useEffect(() => {
        const initializeApp = async () => {
            // fetch self
            const userDetails = await fetchUserDetails(userInfo);
            setUserDetail(userDetails);

            // set up chat
            await initCometChat()
                .then(async () => {
                    // Note using userDetailsFetched and not in state because setUserDetail is not instantaneous
                    if (userInfo && userDetails) {
                        const result = await loginUserToChat(userInfo, userDetails);
                        setUserInfo({...userInfo, isLoggedInToChat: result});
                    }
                })
                .catch((error) => {
                    console.log("Error initializing app", error);
                });
        };

        initializeApp();
    }, []);

    const HomeContent: React.FC = () => {
        return (
            <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
                <Navbar />
                {userInfo?.isVerified ? (
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div style={{ flexGrow: 2 }}>
                            <Switch>
                                <Route
                                    exact
                                    path={FrontendRoutes.DASHBOARD_ROUTE}
                                    component={Dashboard}
                                />

                                <Route
                                    exact
                                    path={FrontendRoutes.CALENDAR_ROUTE}
                                    component={CalendarPage}
                                />

                                <Route
                                    exact
                                    path={FrontendRoutes.MESSAGES_ROUTE}
                                    component={MessagesPage}
                                />

                                <Route
                                    exact
                                    path={`${FrontendRoutes.REQUEST_ROUTE}/:id`}
                                    component={RequestPage}
                                />

                                <Route
                                    exact
                                    path={FrontendRoutes.SETTINGS_ROUTE}
                                    component={SettingsPage}
                                />

                                {/* Default Route -> No routes matched, redirect to dashboard */}
                                <Route
                                    path="/"
                                    render={() => (
                                        <Redirect
                                            to={FrontendRoutes.DASHBOARD_ROUTE}
                                        />
                                    )}
                                />
                            </Switch>
                        </div>
                    </div>
                ) : (
                    <Switch>
                        <Route
                            exact
                            path={FrontendRoutes.PENDING_VERIFICATION_ROUTE}
                            component={VerifyPage}
                        />

                        <Route
                            exact
                            path={FrontendRoutes.ACCOUNT_CONFIRMATION_ROUTE}
                            component={ConfirmAccountPage}
                        />

                        {/* Default Route -> No routes matched, redirect to pending */}
                        <Route
                            path="/"
                            render={() => (
                                <Redirect
                                    to={
                                        FrontendRoutes.PENDING_VERIFICATION_ROUTE
                                    }
                                />
                            )}
                        />
                    </Switch>
                )}
            </UserDetailsContext.Provider>
        );
    };

    return <HomeContent />;
};

export default HomeContainer;
