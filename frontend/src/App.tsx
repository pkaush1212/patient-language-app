import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    useLocation,
} from "react-router-dom";
import Helmet from "react-helmet";
import * as CONSTANTS from "./config/constants";

import LoginPage from "./pages";
import HomeContainer from "./pages/_app";
import useUserInfo from "./shared/hooks/useUserInfo";
import { UserInfoContext } from "./shared/contexts/UserContextProvider";
import { SnackbarKey, SnackbarProvider } from "notistack";
import FrontendRoutes from "./config/frontendRoutes";
import { ThemeProvider } from "@material-ui/styles";
import Slide from "@material-ui/core/Slide";
import theme from "./ui/theme";
import CreateAccountPage from "./pages/account/create";
import ForgotPasswordPage from "./pages/password/forgot";
import ResetPasswordPage from "./pages/password/reset";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

function App() {
    const { userInfo, setUserInfo } = useUserInfo();

    const snackbarRef = React.createRef<SnackbarProvider>();

    const onClickDismiss = (key: SnackbarKey | undefined) => {
        snackbarRef?.current?.closeSnackbar(key);
    };

    return (
        <Router>
            <>
                <Helmet>
                    <title>{CONSTANTS.APP_TITLE}</title>
                    <meta property="og:title" content={CONSTANTS.APP_TITLE} />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:site_name"
                        content={CONSTANTS.APP_TITLE}
                    />
                    <meta
                        property="og:description"
                        content={CONSTANTS.APP_DESCRIPTION}
                    />
                </Helmet>
            </>

            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    ref={snackbarRef}
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    action={(key) => (
                        <IconButton
                            aria-label="close"
                            style={{ color: "white" }}
                            onClick={() => onClickDismiss(key)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}
                    // @ts-ignore
                    TransitionComponent={Slide}
                    autoHideDuration={3000}
                >
                    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                        {userInfo ? (
                            <>
                                <HomeContainer />
                            </>
                        ) : (
                            <>
                                {/* Unauthenticated routes */}
                                <Switch>
                                    <Route
                                        exact
                                        path={FrontendRoutes.LOGIN_ROUTE}
                                        component={LoginPage}
                                    />

                                    <Route
                                        exact
                                        path={FrontendRoutes.FORGOT_PASS_ROUTE}
                                        component={ForgotPasswordPage}
                                    />

                                    <Route
                                        exact
                                        path={FrontendRoutes.RESET_PASS_ROUTE}
                                        component={ResetPasswordPage}
                                    />

                                    <Route
                                        exact
                                        path={
                                            FrontendRoutes.CREATE_ACCOUNT_ROUTE
                                        }
                                        component={CreateAccountPage}
                                    />

                                    {/* no routes matched, redirect them to login. */}
                                    <Route
                                        path="/"
                                        component={() => (
                                            <Redirect
                                                to={{
                                                    pathname: FrontendRoutes.LOGIN_ROUTE,
                                                    search: `?redir_to=${window.location.pathname}`
                                                }}   
                                            />
                                        )}
                                    />
                                </Switch>
                            </>
                        )}
                    </UserInfoContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
