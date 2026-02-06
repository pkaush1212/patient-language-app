import { RequestState } from "../../constants";
import IAppointment from "./IAppointment";
import IMongooseFields from "./IMongooseFields";

export default interface IRequest extends IMongooseFields {
    requester: string | IRequester;
    appointment?: string | IAppointment;

    state: RequestState;
    date: Date;
    interpretationMode: Mode;
    languageRequired: Language[];

    dialect?: string;
    patientGender?: string;
    department?: string;
    clinicalSetting?: ClinicalSetting;
    requestNotes: string;
}
