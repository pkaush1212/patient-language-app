import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
} else if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: ".env.development" });
}

export const ENVIRONMENT = process.env.NODE_ENV;

/** Comet Chat Secrets */
export const COMET_CHAT_APP_ID = process.env.REACT_APP_COMET_CHAT_APP_ID;
export const COMET_CHAT_REGION = process.env.REACT_APP_COMET_CHAT_REGION;
export const COMET_CHAT_AUTH_KEY = process.env.REACT_APP_COMET_CHAT_AUTH_KEY;
