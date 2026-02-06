import { IInterpreter } from "./IInterpreter";
import { IRequest } from "./IRequest";
import { IRequester } from "./IRequester";

export interface IAppointment {
	requester: string | IRequester;
	interpreter: string | IInterpreter;
	request: string | IRequest;
}
