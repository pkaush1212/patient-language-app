export enum FrontendRoutes {
    // Logged In, Verified Menu Routes
    DASHBOARD_ROUTE = "/dashboard",
    CALENDAR_ROUTE = "/calendar",
    MESSAGES_ROUTE = "/inbox",
    SETTINGS_ROUTE = "/settings",
    REQUEST_ROUTE = "/request",

    LOGOUT_ROUTE = "/logout",

    // Other Routes
    LOGIN_ROUTE = "/login",
    FORGOT_PASS_ROUTE = "/password/forgot",
    RESET_PASS_ROUTE = "/password/reset",
    CREATE_ACCOUNT_ROUTE = "/account/create",
    PENDING_VERIFICATION_ROUTE = "/account/verify",
    ACCOUNT_CONFIRMATION_ROUTE = "/account/confirm",
}

export default FrontendRoutes;
