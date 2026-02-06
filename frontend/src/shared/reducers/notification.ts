import {
    INotificationModel,
    INotificationState,
} from "../contexts/NotificationContextProvider";
import { Action } from "./common";

const UPDATE_NOTIFICATIONS = "UPDATE_NOTIFS";
const MARK_ALL_READ = "MARK_ALL_READ";
const MARK_ALL_SEEN = "MARK_ALL_SEEN";
const MARK_NOTIF_READ = "MARK_NOTIF_READ";
const TOGGLE_NOTIF_DRAWER = "TOGGLE_NOTIF_DRAWER";

export interface UPDATE_NOTIFS_ACTION extends Action {
    payload: INotificationModel[];
}

export type MARK_ALL_READ_ACTION = Action;

export interface TOGGLE_NOTIF_DRAWER_ACTION extends Action {
    payload: boolean;
}

export const notificationReducer = (
    state: INotificationState,
    action: Action
) => {
    switch (action.type) {
        case UPDATE_NOTIFICATIONS:
            const notifications = (action as UPDATE_NOTIFS_ACTION).payload;
            return {
                ...state,
                notifications: notifications,
                countUnseen: notifications.filter(notif => !notif.seen).length,
            };
        case MARK_ALL_READ:
            return {
                ...state,
                notifications: state.notifications.map(
                    (notif: INotificationModel) => {
                        return { ...notif, read: true };
                    }
                ),
            };
        case MARK_ALL_SEEN:
            return {
                ...state,
                countUnseen: 0,
            };
        case MARK_NOTIF_READ:
            return {
                ...state,
                notifications: state.notifications.map((notif) => {
                    if (notif._id === action.payload) notif.read = true;
                    return notif;
                }),
            };
        case TOGGLE_NOTIF_DRAWER:
            return {
                ...state,
                drawerOpen: (action as TOGGLE_NOTIF_DRAWER_ACTION).payload,
            };
        default:
            throw new Error();
    }
};

export {
    UPDATE_NOTIFICATIONS,
    MARK_ALL_READ,
    MARK_ALL_SEEN,
    MARK_NOTIF_READ,
    TOGGLE_NOTIF_DRAWER,
};
