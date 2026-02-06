import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import ErrorResponse from "../config/types/errorResponse";
import { authorizationHeader } from "../config/APIConfig";

class NotificationAPI {
    constructor() {
        const routes = [
            APIRoute.NOTIF_GET_BY_RECEIVER, 
            APIRoute.NOTIF_MARK_READ, 
            APIRoute.NOTIF_MARK_SEEN
        ];

        API.createEntities(routes);
    }

    public getAllNotificationsForUser(
        token: string
        ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.NOTIF_GET_BY_RECEIVER).getAll(
            authorizationHeader(token)
        );
    }

    public markNotificationAsRead(
        notificationId: string, token: string,
        ): AxiosPromise<any | ErrorResponse> {
            return API.getEndpoint(APIRoute.NOTIF_MARK_READ).update(notificationId, {}, 
                authorizationHeader(token));
    }

    public markNotificationsSeen(
        notificationIds: string[], token: string
        ): AxiosPromise<any | ErrorResponse> {
            return API.getEndpoint(APIRoute.NOTIF_MARK_SEEN).update("", {
                notificationIds: notificationIds
            }, authorizationHeader(token));
        }
}

export const Notification = new NotificationAPI();
export default Notification;
