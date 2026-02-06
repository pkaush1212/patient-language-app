import { Document, Model, model, Schema } from "mongoose";
import { ClinicalSetting, Language, Position } from "../../config/properties";
import { IRequester } from "../../domain/IRequester";
import { User } from "./user";

export interface IRequesterModel extends IRequester, Document {}

const requesterSchema: Schema = new Schema(
	{
		phoneNumber: String,
		hospital: String,
		department: String,
		position: {
			type: String,
			enum: Position,
		},
		clinicalSetting: {
			type: String,
			enum: ClinicalSetting,
		},
	},
	{
		timestamps: true,
	}
);

requesterSchema.index({ createdAt: 1 });

const Requester: Model<IRequesterModel> = User.discriminator("requester", requesterSchema);

export { Requester };
