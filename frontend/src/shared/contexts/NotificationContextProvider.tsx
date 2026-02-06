import React from "react";

export enum NotificationType {
    NOTIF_REQUESTS,
    NOTIF_MESSAGE,
}

export interface INotificationModel {
    _id: string;
    key: NotificationType;
    icon: any;
    message: string;
    onClick: () => void;
    read: boolean;
    seen: boolean;
    createdTimestamp?: string;
}

export interface INotificationState {
    notifications: INotificationModel[];
    countUnseen: number;
    drawerOpen: boolean;
}

interface INotificationContext {
    notificationState: INotificationState;
    dispatch: React.Dispatch<any>;
}

export const NotificationContext = React.createContext(
    {} as INotificationContext
);
