// @ts-nocheck
import { Document, Model, model, Schema } from "mongoose";
import { NotificationTypes, RequestStateUpdateNotificationType } from "../../../config/properties";
import { INotification } from "../../../domain/notifications/INotification";

export interface INotificationModel extends INotification, Document {}

const notificationSchema: Schema = new Schema(
	{
		type: {
			type: String,
			enum: NotificationTypes,
			required: true,
		},
		senderId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		metadata: {
			newState: {
				type: String,
				enum: RequestStateUpdateNotificationType,
			},
			request: {
				type: Schema.Types.ObjectId,
				ref: "Request",
				index: true,
				unique: true
			},
		},
		seen: {
			type: Boolean,
			default: false
		},
		read: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
	}
);

notificationSchema.index({ receiverId: 1 });

// Set auto-populate of request field
const autoPopulateRequest = function (next) {
	this.populate("metadata.request");
	next();
};

notificationSchema.pre("findOne", autoPopulateRequest).pre("find", autoPopulateRequest);

const Notification: Model<INotificationModel> = model("Notification", notificationSchema);

export { Notification };
