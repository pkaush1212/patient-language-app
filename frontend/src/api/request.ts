import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import { authorizationHeader } from "../config/APIConfig";
import IRequest from "../config/types/entities/IRequest";

class RequestAPI {
    constructor() {
        const routes = [APIRoute.REQUEST, APIRoute.REQUEST_CANCEL];

        API.createEntities(routes);
    }

    public create(request: IRequest, token: string): AxiosPromise<IRequest> {
        return API.getEndpoint(APIRoute.REQUEST).create(request, {
            config: authorizationHeader(token),
        });
    }

    public getById(_id: string, token: string): AxiosPromise<IRequest> {
        return API.getEndpoint(APIRoute.REQUEST).getOne(
            _id,
            authorizationHeader(token)
        );
    }

    public update(
        _id: string,
        request: IRequest,
        token: string
    ): AxiosPromise<IRequest> {
        return API.getEndpoint(APIRoute.REQUEST).update(
            _id,
            request,
            authorizationHeader(token)
        );
    }

    public cancel(_id: string, token: string): AxiosPromise<IRequest> {
        return API.getEndpoint(APIRoute.REQUEST_CANCEL).update(
            _id,
            {},
            authorizationHeader(token)
        );
    }

    public delete(_id: string, token: string): AxiosPromise<IRequest> {
        return API.getEndpoint(APIRoute.REQUEST).delete(
            _id,
            authorizationHeader(token)
        );
    }
}

export const Request = new RequestAPI();
export default Request;
