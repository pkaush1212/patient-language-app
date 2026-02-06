import { INotification } from "../../domain/notifications/INotification";
import { INotificationModel, Notification } from "../models/notifications/notification";

export const notificationDBInteractions = {
	create: (notification: INotification): Promise<INotificationModel> => {
		return Notification.create(notification);
	},

	batchInsert: (notifications: INotification[]): Promise<INotificationModel[]> => {
		return Notification.insertMany(notifications);
	},

	findById: (notificationId: string): Promise<INotificationModel> => {
		return Notification.findOne({ _id: notificationId }).exec();
	},

	findAllByReceiverId: (notificationIds: string[]): Promise<INotificationModel[]> => {
		return Notification.find({
			receiverId: { $in: notificationIds },
		}).sort({ createdAt: -1 }).exec();
	},

	updateFields: (notificationId: string, fields: any): Promise<INotificationModel> => {
		return Notification.findByIdAndUpdate(notificationId, fields, { new: true }).exec();
	},
};
