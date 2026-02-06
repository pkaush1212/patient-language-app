import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/secrets";
import logger from "../../utils/logger";
import { statusCodes } from "../../config/statusCodes";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers?.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		try {
			logger.info("Received JWT Token. Decoding....");

			const decoded = await jwt.verify(token, JWT_SECRET);

			const { _id, role, isVerified } = decoded;

			if (
				_id === undefined ||
				role === undefined ||
				isVerified === undefined ||
				_id === null ||
				role === null ||
				isVerified === null
			) {
				response.status(statusCodes.UNAUTHORIZED).send();
			}

			// Save to response.locals
			response.locals._id = _id;
			response.locals.role = role;
			response.locals.isVerified = isVerified;

			logger.debug("Success decoding. User _id is " + decoded._id);

			next();
		} catch (jwtError) {
			response.status(statusCodes.UNAUTHORIZED).send();
		}
	} else {
		response.status(statusCodes.UNAUTHORIZED).send();
	}
}

export default authMiddleware;
