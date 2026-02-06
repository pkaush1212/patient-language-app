import { Language } from "../config/properties";
import { IUser } from "./IUser";

export interface IInterpreter extends IUser {
	languagesSpoken: Language[];
	dateOfTraining: Date;
	fieldOfStudy: string;
}
