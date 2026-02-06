// @ts-nocheck
import { Document, Model, model, Schema } from "mongoose";
import { Mode, ClinicalSetting, Language, RequestState } from "../../config/properties";
import { IRequest } from "../../domain/IRequest";
import { Appointment } from "./appointment";

export interface IRequestModel extends IRequest, Document {}

const requestSchema: Schema = new Schema(
	{
		// define relationship to requester
		requester: {
			type: Schema.Types.ObjectId,
			ref: "Requester",
		},

		appointment: {
			type: Schema.Types.ObjectId,
			ref: "Appointment",
			index: true,
		},

		state: {
			type: String,
			default: RequestState.PENDING,
			enum: RequestState,
		},

		date: Date,
		interpretationMode: {
			type: String,
			enum: Mode,
		},
		languageRequired: [
			{
				type: String,
				enum: Language,
			},
		],
		dialect: String,
		patientGender: String,
		department: String,
		clinicalSetting: {
			type: String,
			enum: ClinicalSetting,
		},
		requestNotes: String,
	},
	{
		timestamps: true,
	}
);

requestSchema.index({ createdAt: 1 });

requestSchema.pre("remove", function (next) {
	Appointment.findOneAndDelete({ request: this._id }).exec();
	next();
});

const Request: Model<IRequestModel> = model("Request", requestSchema);

export { Request };
