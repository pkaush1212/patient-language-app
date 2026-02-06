import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { clearTimeout } from "timers";
import Notification from "../../../api/notification";
import {
    NOTIF_NEW_PROPOSED_REQ_TEXT,
    NOTIF_REQ_STATE_UPDATE_TEXT,
    RequestStateUpdateNotificationType,
} from "../../../config/constants";
import FrontendRoutes from "../../../config/frontendRoutes";
import { NOTIFICATION_POLLING_INTERVAL } from "../../../config/properties";
import INotification from "../../../config/types/entities/INotification";
import IRequest from "../../../config/types/entities/IRequest";
import ErrorResponse from "../../../config/types/errorResponse";
import {
    INotificationModel,
    NotificationContext,
    NotificationType,
} from "../../../shared/contexts/NotificationContextProvider";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import { UPDATE_NOTIFICATIONS } from "../../../shared/reducers/notification";
import { getDateString, getTimeSinceString } from "../../../utils/functions";
import { NotifIcons } from "../NotificationIcon";

interface NotificationControllerProps {}

const NotificationController: React.FC<NotificationControllerProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const { dispatch } = useContext(NotificationContext);
    const history = useHistory();

    const createProposedReqNotif = (
        notification: INotification
    ): INotificationModel => {
        const request: IRequest = notification.metadata.request;
        return {
            _id: notification._id!,
            key: NotificationType.NOTIF_REQUESTS,
            icon: NotifIcons.NEW_REQUEST,
            message: NOTIF_NEW_PROPOSED_REQ_TEXT(
                getDateString(new Date(request.date))
            ),
            onClick: () => {
                history.push({
                    pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request._id}`,
                });
            },
            read: notification.read,
            seen: notification.seen,
            createdTimestamp: getTimeSinceString(
                new Date(notification.createdAt!)
            ),
        };
    };

    const createReqStateUpdateNotif = (
        notification: INotification
    ): INotificationModel => {
        const request: IRequest = notification.metadata.request;
        const newRequestState: RequestStateUpdateNotificationType =
            notification.metadata.newState!;

        return {
            _id: notification._id!,
            key: NotificationType.NOTIF_REQUESTS,
            icon: NotifIcons.REQ_STATE_UPDATE,
            message: NOTIF_REQ_STATE_UPDATE_TEXT(
                getDateString(new Date(request?.date)),
                newRequestState
            ),
            onClick: () => {
                history.push({
                    pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request?._id}`,
                });
            },
            read: notification.read,
            seen: notification.seen,
            createdTimestamp: getTimeSinceString(
                new Date(notification.createdAt!)
            ),
        };
    };

    const pollNotifications = () => {
        const getNotifications = async () => {
            await Notification.getAllNotificationsForUser(userInfo!.accessToken)
                .then((response) => {
                    const notificationResponse: INotification[] = response.data;
                    const notifications: INotificationModel[] = [];

                    notificationResponse
                        .filter(
                            (receivedNotif) => receivedNotif?.metadata?.request
                        )
                        .map((validNotif) => {
                            switch (validNotif.type) {
                                case "PROPOSED_REQUEST_NOTIFICATION":
                                    return notifications.push(
                                        createProposedReqNotif(validNotif)
                                    );
                                case "REQUEST_STATE_NOTIFICATION":
                                    return notifications.push(
                                        createReqStateUpdateNotif(validNotif)
                                    );
                            }
                        });

                    dispatch({
                        type: UPDATE_NOTIFICATIONS,
                        payload: notifications,
                    });
                })
                .catch((error: ErrorResponse) => {
                    console.error("Unable to fetch notifications" + error);
                });

            const handle = setTimeout(
                getNotifications,
                NOTIFICATION_POLLING_INTERVAL
            );

            return () => {
                clearTimeout(handle);
            };
        };

        getNotifications();
    };

    useEffect(() => {
        pollNotifications();
    }, [userInfo]);

    return <React.Fragment />;
};

export default NotificationController;
