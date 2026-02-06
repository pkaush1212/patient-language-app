import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import ErrorResponse from "../config/types/errorResponse";
import { authorizationHeader } from "../config/APIConfig";
import IInterpreter from "../config/types/entities/IInterpreter";
import { IAuthResponse } from "../config/types/APICustomResponse";
import IRequest from "../config/types/entities/IRequest";
import IAppointment from "../config/types/entities/IAppointment";

class InterpreterAPI {
    constructor() {
        const routes = [
            APIRoute.INTERPRETER,
            APIRoute.INTERPRETER_APPOINTMENTS,
            APIRoute.INTERPRETER_PROPOSED_REQUESTS,
        ];

        API.createEntities(routes);
    }

    /** TODO: There's gotta be a better way than passing token to everything.... */
    public create(interpreter: IInterpreter): AxiosPromise<IAuthResponse> {
        return API.getEndpoint(APIRoute.INTERPRETER).create(interpreter);
    }

    public getById(
        _id: string,
        token: string
    ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.INTERPRETER).getOne(
            _id,
            authorizationHeader(token)
        );
    }

    public update(
        _id: string,
        interpreter: IInterpreter,
        token: string
    ): AxiosPromise<IInterpreter | ErrorResponse> {
        return API.getEndpoint(APIRoute.INTERPRETER).update(
            _id,
            interpreter,
            authorizationHeader(token)
        );
    }

    public delete(
        _id: string,
        token: string
    ): AxiosPromise<IInterpreter | ErrorResponse> {
        return API.getEndpoint(APIRoute.INTERPRETER).delete(
            _id,
            authorizationHeader(token)
        );
    }

    public getAppointments(
        token: string,
        queries?: { from?: string; to?: string }
    ): AxiosPromise<IAppointment[]> {
        return API.getEndpoint(APIRoute.INTERPRETER_APPOINTMENTS).getAll({
            ...authorizationHeader(token),
            params: { from: queries?.from, to: queries?.to },
        });
    }

    // TODO: change return type
    public getProposedRequests(token: string): AxiosPromise<IRequest[]> {
        return API.getEndpoint(APIRoute.INTERPRETER_PROPOSED_REQUESTS).getAll(
            authorizationHeader(token)
        );
    }
}

export const Interpreter = new InterpreterAPI();
export default Interpreter;
