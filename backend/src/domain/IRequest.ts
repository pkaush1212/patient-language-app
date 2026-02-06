import { Mode, ClinicalSetting, Language, RequestState } from "../config/properties";
import { IAppointment } from "./IAppointment";
import { IRequester } from "./IRequester";

export interface IRequest {
	requester: string | IRequester; // relationship to requester
	appointment: string | IAppointment; // relationship to appointment (if matched)

	state: RequestState;
	date: Date;
	interpretationMode: Mode;
	languageRequired: Language[];
	dialect: string;
	patientGender: string;
	department: string;
	clinicalSetting: ClinicalSetting;
}
