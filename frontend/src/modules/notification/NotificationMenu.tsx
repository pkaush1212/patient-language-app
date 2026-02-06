import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Notification from "../../api/notification";
import {
    INotificationModel,
    NotificationContext,
} from "../../shared/contexts/NotificationContextProvider";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import {
    MARK_ALL_READ,
    TOGGLE_NOTIF_DRAWER,
} from "../../shared/reducers/notification";
import NotificationCard from "./NotificationCard";

interface NotificationMenuProps {
    toggleNotifMenu: (menuOpen: boolean) => void;
}

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        margin: "1%",
    },
    content: {
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        maxHeight: "34vh",
    },
    markReadContainer: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
    },
    markRead: {
        color: "red",
        cursor: "pointer",
    },
    footer: {
        position: "absolute",
        bottom: "2%",
        display: "flex",
        flexDirection: "column-reverse",
        alignSelf: "center",
        cursor: "pointer",
    },
    viewAllText: {
        color: "blue",
    },
}));

const NotificationMenu: React.FC<NotificationMenuProps> = ({
    toggleNotifMenu,
}) => {
    const styles = useStyles();
    const { userInfo } = useContext(UserInfoContext);
    const { notificationState, dispatch } = useContext(NotificationContext);

    const openAllNotifications = () => {
        toggleNotifMenu(false);
        dispatch({ type: TOGGLE_NOTIF_DRAWER, payload: true });
    };

    const markAllRead = () => {
        dispatch({ type: MARK_ALL_READ });
        
        const notificationIds = notificationState.notifications.map(notif => notif._id.toString());
        
        notificationIds.map(async (notificationId) => {
            await Notification.markNotificationAsRead(notificationId, userInfo!.accessToken);
        });
    }

    return (
        <div className={styles.root}>
            <div
                className={styles.markReadContainer}
                onClick={markAllRead}
            >
                <Typography className={styles.markRead}>
                    Mark all read
                </Typography>
            </div>
            <Divider />
            <div className={styles.content}>
                {notificationState?.notifications.map(
                    (notification: INotificationModel) => {
                        return (
                            <NotificationCard
                                notification={notification}
                                toggleNotifMenu={toggleNotifMenu}
                            />
                        );
                    }
                )}
            </div>
            <div className={styles.footer} onClick={openAllNotifications}>
                <div>
                    <Divider />
                    <Typography className={styles.viewAllText}>
                        View All Notifications
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default NotificationMenu;
