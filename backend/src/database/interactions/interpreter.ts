import { Language } from "../../config/properties";
import { IInterpreter } from "../../domain/IInterpreter";
import { IInterpreterModel, Interpreter } from "../models/interpreter";

export const interpreterDBInteractions = {
	existsById: (interpreterId: string): Promise<boolean> => {
		// @ts-ignore
		return Interpreter.exists({ _id: interpreterId });
	},

	create: (interpreter: IInterpreter): Promise<IInterpreterModel> => {
		return Interpreter.create(interpreter);
	},

	all: (): Promise<IInterpreterModel[]> => {
		return Interpreter.find().sort({ createdAt: -1 }).exec();
	},

	find: (interpreterId: string): Promise<IInterpreterModel> => {
		return Interpreter.findOne({ _id: interpreterId }).exec();
	},

	findByAttribute: (
		attributeKey: string,
		attributeValue: any,
		option = "-password"
	): Promise<IInterpreterModel[]> => {
		return Interpreter.find({ [attributeKey]: attributeValue })
			.select(option)
			.exec();
	},

	update: (interpreterId: string, newInterpreter: IInterpreter): Promise<IInterpreterModel> => {
		return Interpreter.findByIdAndUpdate(interpreterId, newInterpreter, {
			new: true,
		}).exec();
	},

	findAndDelete: (interpreterId: string): Promise<IInterpreterModel> => {
		return Interpreter.findByIdAndDelete(interpreterId).exec();
	},

	findManyEligibleForLanguages: (languages: Language[]): Promise<IInterpreterModel[]> => {
		return Interpreter.find({
			isVerified: true,
			languagesSpoken: { $in: languages }
		}).exec();
	}
};
