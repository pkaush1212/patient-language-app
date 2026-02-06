import { ClinicalSetting, Position } from "../config/properties";
import { IUser } from "./IUser";

export interface IRequester extends IUser {
	phoneNumber: string;
	hospital: string;
	department: string;
	position: Position;
	clinicalSetting: ClinicalSetting;
}
