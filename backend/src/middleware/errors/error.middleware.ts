import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";
import HttpException from "./HttpException";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = error.status || 500;
	const message = error.message || "Something went wrong";

	logger.error(`Status-${status}. Message-${message}`);

	response.status(status).send({
		error: true,
		status,
		message,
	});
}

export default errorMiddleware;
