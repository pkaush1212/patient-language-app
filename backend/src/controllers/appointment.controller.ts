import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { requestDBInteractions } from "../database/interactions/request";
import { statusCodes } from "../config/statusCodes";
import { appointmentDBInteractions } from "../database/interactions/appointment";
import { IAppointmentModel } from "../database/models/appointment";
import { IAppointment } from "../domain/IAppointment";
import HttpException from "../middleware/errors/HttpException";
import { IRequest } from "../domain/IRequest";
import { interpreterDBInteractions } from "../database/interactions/interpreter";
import { requesterDBInteractions } from "../database/interactions/requester";
import { NotificationTypes, RequestState, RequestStateUpdateNotificationType } from "../config/properties";
import { notificationDBInteractions } from "../database/interactions/notification";
import { IRequestModel } from "../database/models/request";

const appointmentController = {
	show: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { appointmentId } = req.params;

				const populateOptions = [
					{
						path: "interpreter",
						model: "interpreter",
						select: "_id firstName lastName",
					},
					{
						path: "requester",
						model: "requester",
						select: "_id firstName lastName",
					},
					{
						path: "request",
						model: "Request",
					},
				];

				const appointment: IAppointmentModel = await appointmentDBInteractions.find(
					appointmentId,
					populateOptions
				);

				appointment
					? res.status(statusCodes.SUCCESS).json(appointment)
					: res.status(statusCodes.NOT_FOUND).json({
							status: statusCodes.NOT_FOUND,
							message: "Appointment not found",
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
				const appointment = req.body;

				const appointmentData: IAppointment = {
					...appointment,
				};

				// Verify if all exist.
				const checkInterpreter = interpreterDBInteractions.existsById(appointmentData.interpreter as string);
				const checkRequester = requesterDBInteractions.existsById(appointmentData.requester as string);
				const checkRequest = requestDBInteractions.existsById(appointmentData.request as string);

				const verification = await Promise.all([checkInterpreter, checkRequester, checkRequest]);

				verification.map((exists) => {
					if (!exists) {
						next(new HttpException(statusCodes.BAD_REQUEST, "Invalid appointment data"));
						return;
					}
				});

				// Ensure appointment has not been matched already.
				// @ts-ignore
				const requestObj: IRequest = await (
					await requestDBInteractions.find(appointmentData.request as string)
				).toJSON();

				if (requestObj.state === RequestState.MATCHED) {
					next(new HttpException(statusCodes.BAD_REQUEST, "Request has already been matched"));
					return;
				}

				const newAppointment: IAppointmentModel = await appointmentDBInteractions.create(appointmentData);

				const updatedRequest: IRequestModel = await requestDBInteractions.update(
					appointmentData.request as string,
					{
						...requestObj,
						appointment: newAppointment._id,
						state: RequestState.MATCHED,
					}
				);

				// send notification that appointment has been created.
				notificationDBInteractions.create({
					type: NotificationTypes.REQUEST_STATE_NOTIFICATION,
					senderId: appointmentData.interpreter.toString(),
					receiverId: appointmentData.requester.toString(),
					metadata: {
						newState: RequestStateUpdateNotificationType.INTERPRETER_ACCEPTED,
						request: updatedRequest,
					},
					read: false,
					seen: false
				});

				res.status(statusCodes.SUCCESS).json(newAppointment);
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
				const { appointmentId } = req.params;
				const appointment: IAppointmentModel = await appointmentDBInteractions.find(appointmentId);

				if (!appointment) {
					res.status(statusCodes.NOT_FOUND).json({
						status: statusCodes.NOT_FOUND,
						message: "Appointment not found",
					});
				} else {
					const updatedAppointmentBody: IAppointment = {
						...req.body,
					};

					const updatedAppointment: IAppointmentModel = await appointmentDBInteractions.update(
						appointmentId,
						updatedAppointmentBody
					);

					res.status(statusCodes.SUCCESS).json(updatedAppointment);
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
				const { appointmentId } = req.params;
				const { _id } = res.locals;

				const appointment = await appointmentDBInteractions.find(appointmentId);

				const interpreterId = appointment.interpreter.toString();
				const requesterId = appointment.requester.toString();

				if (_id !== interpreterId && _id !== requesterId) {
					next(
						new HttpException(
							statusCodes.FORBIDDEN,
							"You do not have sufficient permissions to delete this appointment"
						)
					);
					return;
				}

				if (appointment) {
					const requestId = appointment.request.toString();

					const updatedRequest: IRequestModel = await requestDBInteractions.updateFields(requestId, {
						state: RequestState.PENDING,
						$unset: { appointment: 1 },
					});

					await appointmentDBInteractions.findAndDelete(appointmentId);

					// send notification to user that has been cancelled.
					notificationDBInteractions.create({
						type: NotificationTypes.REQUEST_STATE_NOTIFICATION,
						senderId: interpreterId,
						receiverId: requesterId,
						metadata: {
							newState: RequestStateUpdateNotificationType.INTERPRETER_CANCELLED,
							request: updatedRequest,
						},
						read: false,
						seen: false
					});
				}

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},
};

export { appointmentController };
