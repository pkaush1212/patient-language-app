import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import ErrorResponse from "../config/types/errorResponse";
import { authorizationHeader } from "../config/APIConfig";
import IAppointment from "../config/types/entities/IAppointment";

class AppointmentAPI {
    constructor() {
        const routes = [APIRoute.APPOINTMENT];

        API.createEntities(routes);
    }

    /** TODO: There's gotta be a better way than passing token to everything.... */
    public create(
        appointment: IAppointment,
        token: string
    ): AxiosPromise<IAppointment> {
        return API.getEndpoint(APIRoute.APPOINTMENT).create(appointment, {
            config: authorizationHeader(token),
        });
    }

    public getById(
        _id: string,
        token: string
    ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.APPOINTMENT).getOne(
            _id,
            authorizationHeader(token)
        );
    }

    public update(
        _id: string,
        appointment: IAppointment,
        token: string
    ): AxiosPromise<IAppointment | ErrorResponse> {
        return API.getEndpoint(APIRoute.APPOINTMENT).update(
            _id,
            appointment,
            authorizationHeader(token)
        );
    }

    public delete(
        _id: string,
        token: string
    ): AxiosPromise<IAppointment | ErrorResponse> {
        return API.getEndpoint(APIRoute.APPOINTMENT).delete(
            _id,
            authorizationHeader(token)
        );
    }
}

export const Appointment = new AppointmentAPI();
export default Appointment;
