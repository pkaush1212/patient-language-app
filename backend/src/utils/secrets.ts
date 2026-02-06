import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
	logger.debug("Using .env file to supply config environment variables");
	dotenv.config({ path: ".env" });

	// read .env, and set mode.
	if (process.env.NODE_ENV === "prod") {
		dotenv.config({ path: ".env.prod" });
	} else if (process.env.NODE_ENV === "dev") {
		dotenv.config({ path: ".env.dev" });
	}
} else if (process.env.NODE_ENV === "test") {
	logger.debug("Ignoring .env file, using TEST mode for CI");
} else {
	logger.error("No .env file found in dev/prod mode. Exiting...");
	process.exit(1);
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	logger.error("No mongo connection string. Set MONGODB_URI_PROD environment variable.");
	process.exit(1);
}

// JWT Secret Key
export const JWT_SECRET = process.env.JWT_SECRET;

// SMTP Information
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;

// URI
export const URI = process.env.URI;
export const FRONTEND_URI = process.env.FRONTEND_URI;
