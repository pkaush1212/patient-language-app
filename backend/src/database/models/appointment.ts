// @ts-nocheck
import { Document, Model, model, Schema } from "mongoose";
import { IAppointment } from "../../domain/IAppointment";

export interface IAppointmentModel extends IAppointment, Document {}

const appointmentSchema: Schema = new Schema(
	{
		requester: {
			type: Schema.Types.ObjectId,
			ref: "Requester",
		},

		request: {
			type: Schema.Types.ObjectId,
			ref: "Request",
		},

		interpreter: {
			type: Schema.Types.ObjectId,
			ref: "Interpreter",
		},
	},
	{
		timestamps: true,
	}
);

appointmentSchema.index({ createdAt: 1 });

const Appointment: Model<IAppointmentModel> = model("Appointment", appointmentSchema);

export { Appointment };
