import emailTransporter from "../config/email_config";
import { signTokenWithPayload } from "../utils/auth";
import { approveUserPayload, emailVerificationPayload, passwordResetPayload } from "../config/auth";
import logger from "../utils/logger";
import { URI, SMTP_USER, FRONTEND_URI } from "../utils/secrets";
import {
	approvalEmailSubject,
	approvedUserEmailSubject,
	approvedUserEmailTemplate,
	approveUserEmailTemplate,
	passwordResetSubject,
	pwResetEmailTemplate,
	requestNotificationEmailSubject,
	requestNotificationTemplate,
	verificationEmailSubject,
	verificationEmailTemplate,
} from "../config/properties";
import { IRequestModel } from "../database/models/request";

const sendRequestEligibilityEmail = async (request: IRequestModel, email: string) => {
	const requestNotificationLink = `${FRONTEND_URI}request/${request._id}`;

	const requestHTML = requestNotificationTemplate(requestNotificationLink);

	const mailOptions = {
		from: SMTP_USER,
		to: email,
		subject: requestNotificationEmailSubject,
		html: requestHTML,
	};

	emailTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.error("Error! Request Notification failed to send to " + email + " and error is " + error);
		} else {
			logger.info("Eligible Request Notification email sent succesfully: " + info.response);
		}
	});
}

const sendVerifyEmail = async (userId: string, email: string) => {
	const token = signTokenWithPayload(emailVerificationPayload(userId), "1h");

	// const verificationLink = URI + "api/auth/verify/email/" + token;
	const verificationLink = FRONTEND_URI + "account/confirm?token=" + token;

	const verificationHTML = verificationEmailTemplate(verificationLink);

	const mailOptions = {
		from: SMTP_USER,
		to: email,
		subject: verificationEmailSubject,
		html: verificationHTML,
	};

	emailTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.error("Error! Email Verification:" + error);
		} else {
			logger.info("Verification email sent succesfully: " + info.response);
		}
	});
};

const sendApprovalEmail = (user) => {
	const { _id } = user;
	const token = signTokenWithPayload(approveUserPayload(_id));

	const approvalLink = URI + "auth/verify/team/" + token;

	const approvalHTML = approveUserEmailTemplate(user, approvalLink);

	const mailOptions = {
		from: SMTP_USER,
		to: SMTP_USER,
		subject: approvalEmailSubject,
		html: approvalHTML,
	};

	emailTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.error("Error! User Approval Email:" + error);
		} else {
			logger.info("Approve User Email sent succesfully: " + info.response);
		}
	});
};

const sendApprovedEmailToUser = (user) => {
	const { email } = user;

	const approvedEmailHTML = approvedUserEmailTemplate(user, FRONTEND_URI);

	const mailOptions = {
		from: SMTP_USER,
		to: email,
		subject: approvedUserEmailSubject,
		html: approvedEmailHTML,
	};

	emailTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.error(`Error! Unable to inform user ${email} about approval`);
		} else {
			logger.info("Sent user approval email succesfully: " + info.response);
		}
	});
};

const sendForgotPasswordEmail = (userId: string, email: string, tokenExpiry = "3h") => {
	const token = signTokenWithPayload(passwordResetPayload(userId), tokenExpiry);

	const passwordResetLink = FRONTEND_URI + "password/reset?token=" + token;

	const passwordResetHTML = pwResetEmailTemplate(passwordResetLink);

	const mailOptions = {
		from: SMTP_USER,
		to: email,
		subject: passwordResetSubject,
		html: passwordResetHTML,
	};

	emailTransporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			logger.error("Error! Password Reset :" + error);
		} else {
			logger.info("Password reset email sent succesfully: " + info.response);
		}
	});
};

export { sendApprovalEmail, sendVerifyEmail, sendApprovedEmailToUser, sendRequestEligibilityEmail, sendForgotPasswordEmail };
