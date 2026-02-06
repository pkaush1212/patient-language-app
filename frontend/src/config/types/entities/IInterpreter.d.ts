import { Languages } from "../../languages";
import IUser from "./IUser";

export default interface IInterpreter extends IUser {
    languagesSpoken: Languages[];
    dateOfTraining?: Date;
    fieldOfStudy?: string;
}
