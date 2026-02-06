import { IRequest } from "../IRequest";
import { INotification } from "./INotification";

export interface IRequestStateNotification extends INotification {
	metadata: {
		request: string | IRequest;
	};
}
