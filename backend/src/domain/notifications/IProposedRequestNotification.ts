import { IRequest } from "../IRequest";
import { INotification } from "./INotification";

export interface IProposedRequestNotification extends INotification {
	metadata: {
		// TODO: See if we can omit types from IRequest instead of fetching entire request.
		request: string | IRequest;
	};
}
