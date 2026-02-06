import { NotificationTypes } from "../../config/properties";

export interface INotification {
	type: NotificationTypes;
	senderId: string;
	receiverId: string;
	metadata?: {};
	seen: boolean;
	read: boolean;
}
