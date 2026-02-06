import { IRequester } from "../../domain/IRequester";
import { IRequesterModel, Requester } from "../models/requester";

export const requesterDBInteractions = {
	existsById: (requesterId: string): Promise<boolean> => {
		// @ts-ignore
		return Requester.exists({ _id: requesterId });
	},

	create: (requester: IRequester): Promise<IRequesterModel> => {
		return Requester.create(requester);
	},

	all: (): Promise<IRequesterModel[]> => {
		return Requester.find().sort({ createdAt: -1 }).exec();
	},

	find: (requesterId: string): Promise<IRequesterModel> => {
		return Requester.findOne({ _id: requesterId }).exec();
	},

	findByAttribute: (attributeKey: string, attributeValue: any, option = "-password"): Promise<IRequesterModel[]> => {
		return Requester.find({ [attributeKey]: attributeValue })
			.select(option)
			.exec();
	},
	update: (requesterId: string, newRequester: IRequester): Promise<IRequesterModel> => {
		return Requester.findByIdAndUpdate(requesterId, newRequester, {
			new: true,
		}).exec();
	},

	findAndDelete: (requesterId: string): Promise<IRequesterModel> => {
		return Requester.findByIdAndDelete(requesterId).exec();
	},
};
