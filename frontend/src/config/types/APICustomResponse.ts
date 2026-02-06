import IInterpreter from "./entities/IInterpreter";
import IRequester from "./entities/IRequester";

export interface IAuthResponse {
    user: IInterpreter | IRequester;
    accessToken: string;
    refreshToken: string;
}
