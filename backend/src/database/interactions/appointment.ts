import { IAppointment } from "../../domain/IAppointment";
import { IAppointmentModel, Appointment } from "../models/appointment";

export const appointmentDBInteractions = {
	create: (appointment: IAppointment): Promise<IAppointmentModel> => {
		return Appointment.create(appointment);
	},

	all: (): Promise<IAppointmentModel[]> => {
		return Appointment.find().sort({ createdAt: -1 }).exec();
	},

	find: (appointmentId: string, populateOptions?: any, filters: any = {}): Promise<IAppointmentModel> => {
		const appointment = Appointment.findOne({ _id: appointmentId, ...filters });

		if (populateOptions) {
			appointment.populate(populateOptions);
		}

		return appointment.exec();
	},

	findByAttribute: (
		attributeKey: string,
		attributeValue: any,
		filters: any = {},
		populateOptions?: any
	): Promise<IAppointmentModel[]> => {
		const appointment = Appointment.find({ [attributeKey]: attributeValue, ...filters });

		if (populateOptions) {
			appointment.populate(populateOptions);
		}

		return appointment.exec();
	},

	update: (appointmentId: string, newAppointment: IAppointment): Promise<IAppointmentModel> => {
		return Appointment.findByIdAndUpdate(appointmentId, newAppointment, {
			new: true,
		}).exec();
	},

	findAndDelete: (appointmentId: string): Promise<IAppointmentModel> => {
		return Appointment.findByIdAndDelete(appointmentId).exec();
	},
};
