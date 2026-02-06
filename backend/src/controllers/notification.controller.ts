import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { statusCodes } from "../config/statusCodes";
import { interpreterDBInteractions } from "../database/interactions/interpreter";
import { IInterpreter } from "../domain/IInterpreter";
import HttpException from "../middleware/errors/HttpException";
import { Language, NotificationTypes, UserType } from "../config/properties";
import { INotification } from "../domain/notifications/INotification";
import { notificationDBInteractions } from "../database/interactions/notification";
import { requestDBInteractions } from "../database/interactions/request";
import { IProposedRequestNotification } from "../domain/notifications/IProposedRequestNotification";
import { IRequestModel } from "../database/models/request";

const notificationController = {
	getNotificationsForUser: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { _id, role } = res.locals;

				const notifications: INotification[] = [];

				const allNotifs: INotification[] = await notificationDBInteractions.findAllByReceiverId(_id);
				notifications.push(...allNotifs);

				if (role === UserType.INTERPRETER) {
					// Fetch new proposed requests for interpreter and update notifications db.
					const interpreter: IInterpreter = await interpreterDBInteractions.find(_id);
					const languages: Language[] = interpreter.languagesSpoken;

					// Check all open requests
					const requests: IRequestModel[] = await requestDBInteractions.getOpenRequestsForLanguages(languages);

					const proposedRequestsFromDb: IProposedRequestNotification[] = allNotifs
						.filter((notification) => notification.type === NotificationTypes.PROPOSED_REQUEST_NOTIFICATION)
						.map((notif) => notif as IProposedRequestNotification);

					// Create new notifications
					const newProposedNotifications: INotification[] = requests
						.filter((request) => {
							// filter out only requests that don't exist in database
							const existsInDb = proposedRequestsFromDb.filter((prop) => (prop.metadata.request as IRequestModel)?._id.toString() === request._id.toString()).length > 0;
							return !existsInDb;
						})
						.map((request) => {
							// Now with new requests that aren't in DB, convert to proposed reuests
							return {
								type: NotificationTypes.PROPOSED_REQUEST_NOTIFICATION,
								senderId: request.requester.toString(),
								receiverId: _id,
								metadata: {
									request,
								},
								seen: false,
								read: false
							};
						});

					await notificationDBInteractions.batchInsert(newProposedNotifications);
				}

				res.status(statusCodes.SUCCESS).json(notifications);
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	markNotificationAsRead: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { notificationId } = req.params;

				const notif = await notificationDBInteractions.updateFields(notificationId, {
					read: true
				});

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	},

	markNotificationsAsSeen: async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			next(new HttpException(statusCodes.BAD_REQUEST, errors.array()[0].msg));
		} else {
			try {
				const { notificationIds } = req.body;

				notificationIds.map(async (notifId) => {
					await notificationDBInteractions.updateFields(notifId, {
						seen: true
					});
				});

				res.status(statusCodes.SUCCESS).send();
			} catch (error) {
				next(new HttpException(statusCodes.SERVER_ERROR, error.toString()));
			}
		}
	}
};

export { notificationController };
