import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { hashPassword, signTokenWithPayload } from "../utils/auth";
import { statusCodes } from "../config/statusCodes";
import { interpreterDBInteractions } from "../database/interactions/interpreter";
import { IInterpreterModel } from "../database/models/interpreter";
import { IInterpreter } from "../domain/IInterpreter";
import HttpException from "../middleware/errors/HttpException";
import { interpreterPayload } from "../config/auth";
import { sendApprovalEmail, sendVerifyEmail } from "../services/email-sender";
import { Language } from "../config/properties";
import { IRequest } from "../domain/IRequest";
import { requestDBInteractions } from "../database/interactions/request";
import { IAppointment } from "../domain/IAppointment";
import { appointmentDBInteractions } from "../database/interactions/appointment";
import { generateMongooseDateFilters } from "../utils/functions";

const interpreterController = {
	getall: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const interpreters = await interpreterDBInteractions.all();
				res.status(statusCodes.SUCCESS).json(interpreters);
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
				const { interpreterId } = req.params;

				const interpreter: IInterpreterModel = await interpreterDBInteractions.find(interpreterId);

				interpreter
					? res.status(statusCodes.SUCCESS).json(interpreter)
					: res.status(statusCodes.NOT_FOUND).json({
							status: statusCodes.NOT_FOUND,
							message: "Interpreter not found",
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
				const interpreter = req.body;

				const interpreterData: IInterpreter = {
					...interpreter,
				};

				interpreterData.password = await hashPassword(interpreterData.password);
				interpreterData.isVerified = false;

				const newInterpreter: IInterpreterModel = await interpreterDBInteractions.create(interpreterData);

				const { password, ...user } = newInterpreter.toJSON();
				const token = signTokenWithPayload(interpreterPayload(user));

				sendApprovalEmail(user);

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
				const { interpreterId } = req.params;
				const interpreter: IInterpreterModel = await interpreterDBInteractions.find(interpreterId);

				if (!interpreter) {
					res.status(statusCodes.NOT_FOUND).json({
						status: statusCodes.NOT_FOUND,
						message: "Interpreter not found",
					});
				} else {
					delete req.body.isVerified;
					delete req.body.email;
					delete req.body.password;

					const updatedInterpreterBody: IInterpreter = {
						...req.body,
					};

					const updatedInterpreter: IInterpreterModel = await interpreterDBInteractions.update(
						interpreterId,
						updatedInterpreterBody
					);

					res.status(statusCodes.SUCCESS).json(updatedInterpreter);
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
				const { interpreterId } = req.params;

				await interpreterDBInteractions.findAndDelete(interpreterId);

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/*
		For any interpreter, check open requests that the interpreter is eligible for.
		Returns an array of these requests.
	*/
	getProposedRequests: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id } = res.locals;

				// Get the interpreter's languages
				const interpreter: IInterpreter = await interpreterDBInteractions.find(_id);
				const languages: Language[] = interpreter.languagesSpoken;

				// Check all open requests
				const requests: IRequest[] = await requestDBInteractions.getOpenRequestsForLanguages(languages);

				res.status(statusCodes.SUCCESS).json(requests);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	/**
	 * 	Get all matched appointments for an interpreter.
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

				const filters = generateMongooseDateFilters(from, to, "date");

				const populateOptions = {
					path: "request",
					populate: {
						path: "requester",
						model: "requester",
						select: "_id firstName lastName",
					},
					match: filters,
					options: { sort: { date: -1 } },
				};

				const appointments: IAppointment[] = await appointmentDBInteractions.findByAttribute(
					"interpreter",
					_id,
					{},
					populateOptions
				);

				const result = appointments.filter((appointment) => appointment.request);

				res.status(statusCodes.SUCCESS).json(result);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},
};

export { interpreterController };
