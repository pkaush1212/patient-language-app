import { Language } from "../../config/properties";
import { IRequest } from "../../domain/IRequest";
import { IRequestModel, Request } from "../models/request";

export const requestDBInteractions = {
	existsById: (requestId: string): Promise<boolean> => {
		// @ts-ignore
		return Request.exists({ _id: requestId });
	},

	create: (request: IRequest): Promise<IRequestModel> => {
		return Request.create(request);
	},

	all: (): Promise<IRequestModel[]> => {
		return Request.find().sort({ createdAt: -1 }).exec();
	},

	find: (requestId: string, populateOptions?: any): Promise<IRequestModel> => {
		const request = Request.findOne({ _id: requestId });

		if (populateOptions) {
			request.populate(populateOptions);
		}

		return request.exec();
	},

	findByAttribute: (
		attributeKey: string,
		attributeValue: any,
		filters: any = {},
		populateOptions?: any
	): Promise<IRequestModel[]> => {
		const request = Request.find({ [attributeKey]: attributeValue, ...filters }).sort({ date: -1 });

		if (populateOptions) {
			request.populate(populateOptions);
		}

		return request.exec();
	},

	update: (requestId: string, newRequest: IRequest): Promise<IRequestModel> => {
		return Request.findByIdAndUpdate(requestId, newRequest, {
			new: true,
		}).exec();
	},

	updateFields: (requestId: string, fields: any): Promise<IRequestModel> => {
		return Request.findByIdAndUpdate(requestId, fields, { new: true }).exec();
	},

	findAndDelete: (requestId: string): Promise<IRequestModel> => {
		return Request.findByIdAndDelete(requestId).exec();
	},

	getOpenRequestsForLanguages: (languages: Language[]): Promise<IRequestModel[]> => {
		return Request.find({
			appointment: { $exists: false },
			languageRequired: { $in: languages },
		}).sort({ createdAt: -1 }).exec();
	},
};
