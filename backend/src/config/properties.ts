// TODO: Move to read from a property file instead.

enum Language {
	AFRIKAANS, ALBANIAN, ARABIC, ARMENIAN, BASQUE, BENGALI, BULGARIAN, CATALAN, CAMBODIAN, CANTONESE, CROATIAN, CZECH, DANISH, DUTCH, ENGLISH, ESTONIAN, FIJI, FINNISH, FRENCH, GEORGIAN, GERMAN, GREEK, GUJARATI, HEBREW, HINDI, HUNGARIAN, ICELANDIC, INDONESIAN, IRISH, ITALIAN, JAPANESE, JAVANESE, KOREAN, LATIN, LATVIAN, LITHUANIAN, MACEDONIAN, MALAY, MALAYALAM, MALTESE, MANDARIN, MAORI, MARATHI, MONGOLIAN, NEPALI, NORWEGIAN, PERSIAN, POLISH, PORTUGUESE, PUNJABI, QUECHUA, ROMANIAN, RUSSIAN, SAMOAN, SERBIAN, SLOVAK, SLOVENIAN, SPANISH, SWAHILI, SWEDISH , TAMIL, TATAR, TELUGU, THAI, TIBETAN, TONGA, TURKISH, UKRAINIAN, URDU, UZBEK, VIETNAMESE, WELSH, XHOSA
}

enum Position {
    PHYSICIAN,
    PHYSICIAN_TRAINING,
    ALLIED_HEALTHCARE_PROFESSIONAL,
    ADMINISTRATOR,
    OTHER
}

enum ClinicalSetting {
	INPATIENT,
	OUTPATIENT,
	URGENT,
	OTHER,
}

enum Mode {
	IN_PERSON,
	VIRTUAL,
	TBD
}

enum UserType {
	INTERPRETER = "interpreter",
	REQUESTER = "requester",
}

enum RequestState {
	MATCHED = "Matched",
	PENDING = "Pending",
	CANCELLED = "Cancelled",
}

enum NotificationTypes {
	REQUEST_STATE_NOTIFICATION = "REQUEST_STATE_NOTIFICATION",
	PROPOSED_REQUEST_NOTIFICATION = "PROPOSED_REQUEST_NOTIFICATION",
}

enum RequestStateUpdateNotificationType {
	REQUESTER_CANCELLED = "REQUESTER_CANCELLED",
	INTERPRETER_ACCEPTED = "INTERPRETER_ACCEPTED",
	INTERPRETER_CANCELLED = "INTERPRETER_CANCELLED",
}

export const dateFormat = "YYYY-MM-DD";

const verificationEmailTemplate = (verificationLink: string): string => {
	return `<h1>Verify your account.</h1> <p>To get started on our platform please verify your account by clicking <a href='${verificationLink}' target='_blank'>HERE</a>.</p> <p>Thanks,</p> <p>The Patient Language App team</p>`;
};

/**
 * This is the internal template that goes to team to approve the user.
 */
const approveUserEmailTemplate = (user, approvalLink: string): string => {
	return `<p>Hello,</p>
	<p>&nbsp;</p>
	<p>An interpreter has requested access to the system. Please find their details:</p>
	<ul>
	<li>Email: ${user.email}</li>
	<li>First Name: ${user.firstName}</li>
	<li>Last Name: ${user.lastName}</li>
	<li>Languages Spoken: ${user.languagesSpoken ? user.languagesSpoken : ""}</li>
	<li>Date of Training: ${user.dateOfTraining ? user.dateOfTraining : ""}</li>
	<li>Field of Study: ${user.fieldOfStudy ? user.fieldOfStudy : ""}</li>
	</ul>
	<p>&nbsp;</p>
	<p>To approve this request, please click this <a href="${approvalLink}" target="_blank">link</a></p>
	<p>&nbsp;</p>
	<p>___</p>
	<p>Note: This email is auto-generated. If there are any errors, please contact the system administrator.&nbsp;</p>`;
};

/**
 * This is the template that goes to the USER that they have been approved.
 */
const approvedUserEmailTemplate = (user, webLink: string): string => {
	return `<p>Hello ${user.firstName},</p>
	<p>Congratulations! You have been approved to the Patient Language App platform.</p>
	<p>You may now access the platform:</p>
	<p><a href="${webLink}dashboard" target="_blank"> ${webLink} </a></p>
	<p>&nbsp;</p>
	<p>Thank you,</p>
	<p>The Patient Language App Team.</p>
	<p>&nbsp;</p>
	<p>---</p>
	<p>Note: This email is auto-generated. If there are any errors, please contact the Patient Language App team.</p>`;
};

const pwResetEmailTemplate = (pwResetLink: string): string => {
	return `<p>Hello!</p>
	<p>We've received a request to reset the password for the Patient Language App account associated with your email. No changes have been made to your account yet.</p>
	<p>You can set your password by clicking this  <a href="${pwResetLink}" target="_blank">link</a></p>
	<p>&nbsp;</p>
	<p>If you did not request a new password, please let us know immediately by replying to this email.</p>
	<p>Thank you,</p>
	<p>The Patient Language App Team.</p>
	<p>&nbsp;</p>`;
};

const requestNotificationTemplate = (requestNotificationLink: string): string => {
	return `<p>Hello!</p>
	<p>A new request has been created with required languages for which you are eligible for.</p>
	<p>You can access the request by logging in to the platform, and clicking this link:  <a href="${requestNotificationLink}" target="_blank">${requestNotificationLink}</a></p>
	<p>&nbsp;</p>
	<p>Thank you,</p>
	<p>The Patient Language App Team.</p>
	<p>&nbsp;</p>`;
}

const verificationEmailSubject = "Action Required: Verify Your Email";
const verifiedSuccessTemplate = "You have been succesfully verified. You may close this window";
const verifiedFailureTemplate = "There was an error verifying your email. Please contact the system administrator";

const approvalEmailSubject = "Action Required: New Interpreter Request";
const approvalSuccessTemplate = "The user was succesfully approved. You may close this window";
const approvalFailureTemplate = "There was an error verifying your email. Please contact the system administrator";

const approvedUserEmailSubject = "Your Patient Language App platform registration is now complete.";

const passwordResetSubject = "Password Reset Instructions";

const requestNotificationEmailSubject = "You are eligible for a new request";

export {
	Language,
	Position,
	ClinicalSetting,
	Mode,
	RequestState,
	UserType,
	NotificationTypes,
	RequestStateUpdateNotificationType,
	verificationEmailSubject,
	verificationEmailTemplate,
	approvalEmailSubject,
	approveUserEmailTemplate,
	verifiedSuccessTemplate,
	verifiedFailureTemplate,
	approvalSuccessTemplate,
	approvalFailureTemplate,
	approvedUserEmailSubject,
	approvedUserEmailTemplate,
	passwordResetSubject,
	pwResetEmailTemplate,
	requestNotificationTemplate,
	requestNotificationEmailSubject
};
