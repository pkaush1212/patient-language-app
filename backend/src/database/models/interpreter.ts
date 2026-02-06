import { Document, Model, model, Mongoose, Schema } from "mongoose";
import { Language } from "../../config/properties";
import { IInterpreter } from "../../domain/IInterpreter";
import { User } from "./user";

export interface IInterpreterModel extends IInterpreter, Document {}

const interpreterSchema: Schema = new Schema(
	{
		languagesSpoken: [
			{
				type: String,
				enum: Language,
			},
		],
		dateOfTraining: Date,
		fieldOfStudy: String,
	},
	{
		timestamps: true,
	}
);

interpreterSchema.index({ createdAt: 1 });

const Interpreter: Model<IInterpreterModel> = User.discriminator("interpreter", interpreterSchema);

export { Interpreter };
