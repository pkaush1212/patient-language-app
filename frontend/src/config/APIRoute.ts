export enum APIRoute {
    // Auth routes
    AUTH_LOGIN_INTERPRETER = "auth/login/interpreter",
    AUTH_LOGIN_REQUESTER = "auth/login/requester",
    AUTH_RESET_PASS = "auth/password/reset",
    AUTH_RESET_PASS_LOGGEDIN = "auth/password/reset/form",
    AUTH_FORGOT_PASS = "auth/password/forgot",
    AUTH_VERIFY_EMAIL = "auth/verify/email",
    AUTH_VERIFY_TEAM = "auth/verify/team",
    AUTH_VERIFY_CHECK = "auth/verify/check",
    AUTH_VERIFY_RESEND = "auth/verify/resend",

    // Interpreter routes
    INTERPRETER = "interpreter",
    INTERPRETER_APPOINTMENTS = "interpreter/appointments",
    INTERPRETER_PROPOSED_REQUESTS = "interpreter/requests/proposed",

    // Requester routes
    REQUESTER = "requester",
    REQUESTER_REQUESTS = "requester/requests",
    REQUESTER_APPOINTMENTS = "requester/appointments",

    // Request routes
    REQUEST = "request",
    REQUEST_CANCEL = "request/cancel",

    // Appointment routes
    APPOINTMENT = "appointment",

    // Notification routes
    NOTIF_GET_BY_RECEIVER = "notification/byReceiver",
    NOTIF_MARK_READ = "notification/read",
    NOTIF_MARK_SEEN = "notification/seen",
}
