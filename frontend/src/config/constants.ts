// API Information

/**
 * Note: This should ideally be set from env, but delays in loading env cause it to be undefined for API.
 * As a workaround, these are set here when can't read from env right away.
 */
export const PROD_API_URL = "https://patient-language-app-backend.herokuapp.com/api";
export const LOCAL_API_URL = "http://localhost:8080/api"

// CACHE Information
export const USER_INFO_KEY = "userInfo";

// Known error messages
export const COMET_GUID_TAKEN_ERROR_RECEIVED_TEXT =
    "The guid has already been taken.";

// User Types
export enum UserTypes {
    REQUESTER = "requester",
    INTERPRETER = "interpreter",
}

// Request Types
export enum RequestState {
    MATCHED = "Matched",
    PENDING = "Pending",
    CANCELLED = "Cancelled",
}

// Notification Types
export enum RequestStateUpdateNotificationType {
    REQUESTER_CANCELLED = "REQUESTER_CANCELLED",
    INTERPRETER_ACCEPTED = "INTERPRETER_ACCEPTED",
    INTERPRETER_CANCELLED = "INTERPRETER_CANCELLED",
}

/** Meta constants */
export const APP_TITLE = "Patient Language App";
export const APP_DESCRIPTION =
    "Create a request to get matched with a language interpreter";

/** Meta Page Titles */
export const DASHBOARD_TITLE = `Dashboard | ${APP_TITLE}`;
export const CALENDAR_TITLE = `Calendar | ${APP_TITLE}`;
export const MESSAGES_TITLE = `Messages | ${APP_TITLE}`;
export const SETTINGS_TITLE = `Settings | ${APP_TITLE}`;
export const VIEW_REQUEST_TITLE = `View Request | ${APP_TITLE}`;
export const LOGIN_TITLE = `Log In | ${APP_TITLE}`;
export const SIGNUP_TITLE = `Sign Up | ${APP_TITLE}`;
export const FORGOT_PASS_TITLE = `Forgot Password | ${APP_TITLE}`;
export const RESET_PASS_TITLE = `Reset Password | ${APP_TITLE}`;
export const VERIFY_ACC_TITLE = `Verify Account | ${APP_TITLE}`;

/** Nav Menu constants */
export const DASHBOARD_NAV_MENU = "Dashboard";
export const CALENDAR_NAV_MENU = "Calendar";
export const MESSAGES_NAV_MENU = "Messages";
export const PROFILE_NAV_MENU = "Profile";
export const SETTINGS_NAV_MENU = "Settings";

/** FORM constants */
export const REQUIRED_INPUT = "required";
export const OPTIONAL_INPUT = "optional";
export const EMAIL_LABEL = "Email";
export const PASSWORD_LABEL = "Password";
export const CONFIRM_PASSWORD_LABEL = "Confirm Password";
export const OLD_PASSWORD_LABEL = "Old Password";
export const NEW_PASSWORD_LABEL = "New Password";
export const CONFIRM_NEW_PASSWORD_LABEL = "Confirm New Password";
export const FIRSTNAME_LABEL = "First Name";
export const LASTNAME_LABEL = "Last Name";
export const PHONENUMBER_LABEL = "Phone Number";
export const HOSPITAL_CLINIC_LABEL = "Hospital/Clinic";
export const DEPARTMENT_CLINIC_LABEL = "Department";
export const POSITION_LABEL = "Position";
export const CLINICAL_SETTING_LABEL = "Clinical Setting";
export const LANGUAGES_SPOKEN_LABEL = "Languages Spoken";
export const FIELD_OF_STUDY_LABEL = "Field of Study";
export const DATE_OF_TRAINING_LABEL = "Date of Training";
export const TERMS_CONDITIONS_AGREED_STRING =
    "By joining you agree to the Terms and Privacy Policy";
export const DIALECT_LABEL = "Dialect";
export const PATIENT_GENDER_LABEL = "Patient Gender";
export const DEPARTMENT_FLOOR_LABEL = "Department/Floor";
export const REQUEST_NOTES_LABEL = "Request Notes";
export const INTERPRETATION_MODE_LABEL = "Mode of Interpretation";
export const DATE_OF_REQUEST_LABEL = "Request Date";

export const FORGOT_PASSWORD_LABEL = "Forgot password?";
export const SERVICE_REQUESTER_USER_LABEL = "Service Requester";
export const INTERPRETER_USER_LABEL = "Interpreter";

export const REQUESTER_UPCOMING_DASH_TITLE = "Your Requests";
export const INTERPRETER_UPCOMING_DASH_TITLE = "Your Appointments";
export const REQUESTER_NO_REQUESTS_FOUND =
    "No requests found! Click create a new request to begin.";
export const INTERPRETER_NO_APPOINTMENTS_FOUND =
    "No appointments found! Please check your notifications for new eligible requests.";

/** UX Language */
export const NO_INTERPRETER_STRING = "TBD";
export const IS_MATCHED_CARD_STRING = "Matched";
export const PENDING_MATCH_CARD_STRING = "Pending";
export const CANCELLED_MATCH_CARD_STRING = "Cancelled";
export const CLICK_CARD_TO_VIEW = "Click on any card to view more";

export const REQ_BANNER_APPT_MATCHED_TITLE = "Appointment Matched";
export const REQ_BANNER_APPT_MATCHED_SUB =
    "This request has been matched with an eligible interpreter. Click chat to connect.";
export const REQ_BANNER_APPT_PENDING_TITLE = "Appointment Pending";
export const REQ_BANNER_APPT_PENDING_SUB =
    "This request has not been matched to an eligible interpreter yet.";
export const REQ_BANNER_APPT_CANCELLED_TITLE = "Request Cancelled";
export const REQ_BANNER_APPT_CANCELLED_SUB = "This request was cancelled.";
export const REQ_BANNER_APPT_MATCHED_TEXT = "Appointment Matched";
export const REQ_BANNER_APPT_CANCELLED_TEXT = "Appointment Cancelled";
export const REQ_CANCEL_REQUEST_REQUESTER_WARNING_TEXT =
    "Are you sure you want to cancel this request? This will disable the request from being accepted by any interpreter, however it will NOT delete the request.";
export const REQ_CANCEL_REQUEST_INTERPRETER_WARNING_TEXT =
    "Are you sure you want to cancel this appointment? This action will unassign you from the current request, and requester will be notified.";

/** SNACKBAR Messages */
export const SNACK_SIGN_IN_SUCCESS = "Signed in successfully!";
export const SNACK_SIGN_UP_SUCCESS = "Account created successfully!";
export const SNACK_EMAIL_VERIFIED = "Verified email successfully!";
export const SNACK_RESET_PASSWORD = "Reset password successfully!";
export const SNACK_RESET_PASSWORD_FAIL = "Failed to reset password.";
export const SNACK_RESET_PASS_INVALID_TOK =
    "Invalid token. Please retry resetting your password";
export const SNACK_NEW_PROPOSED_REQ = "There is a new request available!";
export const SNACK_REQ_LOAD_ERROR = "Error loading request";
export const SNACK_REQ_CREATED_SUCCESS = "Request created successfully!";
export const SNACK_REQ_UPDATED_SUCCESS = "Request updated successfully!";
export const SNACK_REQ_DELETED_SUCCESS = "Request deleted successfully!";
export const SNACK_REQ_DELETED_ERROR = "Error deleting request";
export const SNACK_REQ_CANCELLED_SUCCESS = "Request cancelled successfully!";
export const SNACK_REQ_CANCELLED_ERROR = "Error cancelling request";
export const SNACK_APPT_CREATED_SUCCESS =
    "You were matched to this request successfully!";
export const SNACK_APPT_CREATED_ERROR = "Error assigning to request";
export const SNACK_APPT_CANCELLED_SUCCESS =
    "Appointment cancelled successfully!";
export const SNACK_APPT_CANCELLED_ERROR =
    "Error cancelling appointment. Please refresh and try again.";
export const SNACK_UPDATED_PROFILE_SUCCESS = "Profile updated successfully!";

/** Notifications Message */
export const NOTIF_NEW_PROPOSED_REQ_TEXT = (date: string) => {
    return `There is a new request available for ${date} that you are eligible for`;
};

export const NOTIF_REQ_STATE_UPDATE_TEXT = (
    date: string,
    newState: RequestStateUpdateNotificationType
) => {
    switch (newState) {
        case RequestStateUpdateNotificationType.INTERPRETER_ACCEPTED:
            return `Your request for ${date} was matched to an eligible interpreter.`;
        case RequestStateUpdateNotificationType.INTERPRETER_CANCELLED:
            return `Your request for ${date} was cancelled by the interpreter.`;
        case RequestStateUpdateNotificationType.REQUESTER_CANCELLED:
            return `Your appointment for ${date} was cancelled by the requester.`;
        default:
            return "";
    }
};
