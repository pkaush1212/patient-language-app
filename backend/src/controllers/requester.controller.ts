import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { hashPassword, signTokenWithPayload } from "../utils/auth";
import { statusCodes } from "../config/statusCodes";
import { requesterDBInteractions } from "../database/interactions/requester";
import { IRequesterModel } from "../database/models/requester";
import { IRequester } from "../domain/IRequester";
import HttpException from "../middleware/errors/HttpException";
import { requesterPayload } from "../config/auth";
import { sendVerifyEmail } from "../services/email-sender";
import { IRequest } from "../domain/IRequest";
import { requestDBInteractions } from "../database/interactions/request";
import { IAppointment } from "../domain/IAppointment";
import { appointmentDBInteractions } from "../database/interactions/appointment";
import { generateMongooseDateFilters } from "../utils/functions";
import { IRequestModel } from "../database/models/request";

const requesterController = {
	getall: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const requesters = await requesterDBInteractions.all();
				res.status(statusCodes.SUCCESS).json(requesters);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	show: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { requesterId } = req.params;

				const requester: IRequesterModel = await requesterDBInteractions.find(requesterId);

				requester
					? res.status(statusCodes.SUCCESS).json(requester)
					: res.status(statusCodes.NOT_FOUND).json({
							status: statusCodes.NOT_FOUND,
							message: "Requester not found",
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
				const requester = req.body;

				const requesterData: IRequester = {
					...requester,
				};

				requesterData.password = await hashPassword(requesterData.password);
				requesterData.isVerified = false;

				const newRequester: IRequesterModel = await requesterDBInteractions.create(requesterData);

				const { password, ...user } = newRequester.toJSON();
				const token = signTokenWithPayload(requesterPayload(user));

				// @ts-ignore
				sendVerifyEmail(user._id, user.email);

				res.status(statusCodes.SUCCESS).json({ user, accessToken: token, refreshToken: token });
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
				const { requesterId } = req.params;
				const requester: IRequesterModel = await requesterDBInteractions.find(requesterId);

				if (!requester) {
					res.status(statusCodes.NOT_FOUND).json({
						status: statusCodes.NOT_FOUND,
						message: "Requester not found",
					});
				} else {
					delete req.body.isVerified;
					delete req.body.email;
					delete req.body.password;

					const updatedRequesterBody: IRequester = {
						...req.body,
					};

					const updatedRequester: IRequesterModel = await requesterDBInteractions.update(
						requesterId,
						updatedRequesterBody
					);

					res.status(statusCodes.SUCCESS).json(updatedRequester);
				}
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
				const { requesterId } = req.params;

				await requesterDBInteractions.findAndDelete(requesterId);

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/**
	 * 	Get all requests for a requester.
	 *   -> Date filters supported
	 *   -> Populate appointment field by default
	 */
	getRequests: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id } = res.locals;
				const from = req.query.from as string;
				const to = req.query.to as string;

				const filters = generateMongooseDateFilters(from, to, "date");

				const populateOptions = {
					path: "appointment",
					populate: {
						path: "interpreter",
						model: "interpreter",
						select: "_id firstName lastName",
					},
				};

				const requests: IRequest[] = await requestDBInteractions.findByAttribute(
					"requester",
					_id,
					filters,
					populateOptions
				);

				res.status(statusCodes.SUCCESS).json(requests);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/**
	 * 	Get all matched appointments for an requester.
	 */
	getAppointments: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id } = res.locals;
				const from = req.query.from as string;
				const to = req.query.to as string;

				const filters = generateMongooseDateFilters(from, to);

				const appointments: IAppointment[] = await appointmentDBInteractions.findByAttribute(
					"requester",
					_id,
					filters
				);

				res.status(statusCodes.SUCCESS).json(appointments);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},
};

export { requesterController };
