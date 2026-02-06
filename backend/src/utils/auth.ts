import { JWT_SECRET } from "./secrets";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import logger from "./logger";

const signTokenWithPayload = (payload, expiry = "2d"): string => {
	logger.debug("Attempting to sign token with payload: " + JSON.stringify(payload));

	const token = jwt.sign(payload, JWT_SECRET, { algorithm: "HS256", expiresIn: expiry });

	logger.debug("Signed token succesfully.");

	return token;
};

const verifyTokenAndResolve = (
	token,
	verifyTokenCondition: (decoded: any) => boolean,
	errorCallback: (error: any) => any,
	successCallback: (_id: string) => any
) => {
	jwt.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err || !verifyTokenCondition(decoded)) {
			errorCallback(err);
		} else {
			const { _id } = decoded;
			successCallback(_id);
		}
	});
};

const hashPassword = async (plainTextPassword: string) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
	return hashedPassword;
};

const compareHash = async (plainTextPassword: string, hashedPassword: string) => {
	const result = await bcrypt.compare(plainTextPassword, hashedPassword);
	return result;
};

export { signTokenWithPayload, hashPassword, compareHash, verifyTokenAndResolve };
