import { Languages } from "../../languages";
import IUser from "./IUser";

export default interface IRequester extends IUser {
    phoneNumber: string;
    hospital: string;
    department: string;
    position: Position;
    clinicalSetting: ClinicalSetting;
}
