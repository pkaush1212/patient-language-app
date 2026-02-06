import nodemailer from "nodemailer";
import { SMTP_USER, SMTP_PASS } from "../utils/secrets";

const emailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS,
	},
});

export default emailTransporter;
