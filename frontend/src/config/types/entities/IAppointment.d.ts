import IInterpreter from "./IInterpreter";
import IMongooseFields from "./IMongooseFields";
import IRequest from "./IRequest";
import IRequester from "./IRequester";

export default interface IAppointment extends IMongooseFields {
    requester: string | IRequester;
    interpreter: string | IInterpreter;
    request: string | IRequest;
}
