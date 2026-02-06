import {
    RequestState,
    RequestStateUpdateNotificationType,
} from "../../constants";
import IAppointment from "./IAppointment";
import IMongooseFields from "./IMongooseFields";

export default interface INotification extends IMongooseFields {
    type: "PROPOSED_REQUEST_NOTIFICATION" | "REQUEST_STATE_NOTIFICATION";
    senderId: string;
    receiverId: string;
    metadata: {
        request: string | IRequest;
        newState?: RequestStateUpdateNotificationType;
    };
    read: boolean;
    seen: boolean;
}
