import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import ErrorResponse from "../config/types/errorResponse";
import { authorizationHeader } from "../config/APIConfig";
import IRequester from "../config/types/entities/IRequester";
import { IAuthResponse } from "../config/types/APICustomResponse";
import IRequest from "../config/types/entities/IRequest";

class RequesterAPI {
    constructor() {
        const routes = [
            APIRoute.REQUESTER,
            APIRoute.REQUESTER_APPOINTMENTS,
            APIRoute.REQUESTER_REQUESTS,
        ];

        API.createEntities(routes);
    }

    /** TODO: There's gotta be a better way than passing token to everything.... */
    public create(requester: IRequester): AxiosPromise<IAuthResponse> {
        return API.getEndpoint(APIRoute.REQUESTER).create(requester, {
            config: { withCredentials: false },
        });
    }

    public getById(
        _id: string,
        token: string
    ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.REQUESTER).getOne(
            _id,
            authorizationHeader(token)
        );
    }

    public update(
        _id: string,
        requester: IRequester,
        token: string
    ): AxiosPromise<IRequester | ErrorResponse> {
        return API.getEndpoint(APIRoute.REQUESTER).update(
            _id,
            requester,
            authorizationHeader(token)
        );
    }

    public delete(
        _id: string,
        token: string
    ): AxiosPromise<IRequester | ErrorResponse> {
        return API.getEndpoint(APIRoute.REQUESTER).delete(
            _id,
            authorizationHeader(token)
        );
    }

    public getRequests(
        token: string,
        queries?: { from?: string; to?: string }
    ): AxiosPromise<IRequest[]> {
        return API.getEndpoint(APIRoute.REQUESTER_REQUESTS).getAll({
            ...authorizationHeader(token),
            params: { from: queries?.from, to: queries?.to },
        });
    }

    public getAppointments(token: string): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.REQUESTER_APPOINTMENTS).getAll(
            authorizationHeader(token)
        );
    }
}

export const Requester = new RequesterAPI();
export default Requester;
