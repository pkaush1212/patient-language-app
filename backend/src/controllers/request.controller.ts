import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { statusCodes } from "../config/statusCodes";
import { requestDBInteractions } from "../database/interactions/request";
import { IRequestModel } from "../database/models/request";
import { IRequest } from "../domain/IRequest";
import HttpException from "../middleware/errors/HttpException";
import { RequestState } from "../config/properties";
import { IInterpreterModel } from "../database/models/interpreter";
import { interpreterDBInteractions } from "../database/interactions/interpreter";
import logger from "../utils/logger";
import { sendRequestEligibilityEmail } from "../services/email-sender";

const requestController = {
	show: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { requestId } = req.params;

				const populateOptions = [
					{
						path: "appointment",
						populate: [
							{
								path: "interpreter",
								model: "interpreter",
								select: "_id firstName lastName",
							},
						],
					},
					{
						path: "requester",
						model: "requester",
						select: "_id firstName lastName",
					},
				];

				const request: IRequestModel = await requestDBInteractions.find(requestId, populateOptions);

				request
					? res.status(statusCodes.SUCCESS).json(request)
					: res.status(statusCodes.NOT_FOUND).json({
							status: statusCodes.NOT_FOUND,
							message: "Request not found",
					  });
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	create: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const request = req.body;

				const requestData: IRequest = {
					...request,
				};

				const newRequest: IRequestModel = await requestDBInteractions.create(requestData);

				res.status(statusCodes.SUCCESS).json(newRequest);

				logger.info("*START: Sending Proposed Request Notifications");
				// Send proposed request email notification to eligible interpreters.
				const eligibleInterpreters: IInterpreterModel[] = await interpreterDBInteractions.findManyEligibleForLanguages(requestData.languageRequired);
				eligibleInterpreters.map(interpreter => sendRequestEligibilityEmail(newRequest, interpreter.email));
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	update: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { requestId } = req.params;
				const request: IRequestModel = await requestDBInteractions.find(requestId);

				if (!request) {
					res.status(statusCodes.NOT_FOUND).json({
						status: statusCodes.NOT_FOUND,
						message: "Request not found",
					});
				} else {
					const updatedRequestBody: IRequest = {
						...req.body,
					};

					// Ensure can't update past matched request.
					const { date } = request;

					if (date.getTime() < Date.now()) {
						// this is a past matched request, disallow update.
						throw new Error("Unable to update details of a past matched appointment");
					}

					const updatedRequest: IRequestModel = await requestDBInteractions.update(
						requestId,
						updatedRequestBody
					);

					res.status(statusCodes.SUCCESS).json(updatedRequest);
				}
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	cancel: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { requestId } = req.params;
				const { _id } = res.locals;

				const request: IRequest = await requestDBInteractions.find(requestId);
				const requesterId = request.requester.toString();

				if (requesterId !== _id) {
					res.status(statusCodes.FORBIDDEN).send();
				}

				const updatedRequest: IRequestModel = await requestDBInteractions.updateFields(requestId, {
					state: RequestState.CANCELLED,
				});

				res.status(statusCodes.SUCCESS).json(updatedRequest);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	delete: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { requestId } = req.params;
				const { _id } = res.locals;

				const request: IRequest = await requestDBInteractions.find(requestId);
				const requesterId = request.requester.toString();

				if (requesterId !== _id) {
					res.status(statusCodes.FORBIDDEN).send();
				}

				await requestDBInteractions.findAndDelete(requestId);

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},
};

export { requestController };
