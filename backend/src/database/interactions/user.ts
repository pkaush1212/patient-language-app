import { IUser } from "../../domain/IUser";
import { IUserModel, User } from "../models/user";

export const userDBInteractions = {
	create: (user: IUser): Promise<IUserModel> => {
		return User.create(user);
	},

	all: (): Promise<IUserModel[]> => {
		return User.find().sort({ createdAt: -1 }).exec();
	},

	find: (userId: string): Promise<IUserModel> => {
		return User.findOne({ _id: userId }).exec();
	},

	findByAttribute: (attributeKey: string, attributeValue: any, option = "-password"): Promise<IUserModel[]> => {
		return User.find({ [attributeKey]: attributeValue })
			.select(option)
			.exec();
	},

	verifyUser: (userId: string): Promise<IUserModel> => {
		return User.findByIdAndUpdate(userId, { $set: { isVerified: true } }, { returnOriginal: false }).exec();
	},

	update: (userId: string, newUser: IUser): Promise<IUserModel> => {
		return User.findByIdAndUpdate(userId, newUser, {
			new: true,
		}).exec();
	},

	updateFields: (userId: string, fields: any): Promise<IUserModel> => {
		return User.findByIdAndUpdate(userId, fields, { new: true }).exec();
	},

	findAndDelete: (userId: string): Promise<IUserModel> => {
		return User.findByIdAndDelete(userId).exec();
	},
};
