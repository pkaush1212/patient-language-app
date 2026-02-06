import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import {
    INotificationModel,
    NotificationContext,
} from "../../shared/contexts/NotificationContextProvider";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { PALETTE } from "../../config/colors";
import { MARK_NOTIF_READ } from "../../shared/reducers/notification";
import NotificationIcon from "./NotificationIcon";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import Notification from "../../api/notification";

export interface NotificationCardProps {
    notification: INotificationModel;
    toggleNotifMenu?: (menuOpen: boolean) => void;
}

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        borderBottom: "1px solid #ECECEC",
        marginTop: "2%",
        paddingBottom: "3%",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: PALETTE.BACKGROUND_LIGHT_GREY,
        },
    },
    leftContainer: {
        display: "flex",
        flexDirection: "row",
    },
    content: {
        marginLeft: "2%",
        padding: "1%",
    },
    rightContainer: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    readIndicatorContainer: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    readIndicator: {
        fontSize: "12px",
        color: "orange",
    },
    iconContainer: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    messageContainer: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
    },
    message: {
        fontSize: 14,
        color: "black",
    },
}));

const NotificationCard: React.FC<NotificationCardProps> = ({
    notification,
    toggleNotifMenu,
}) => {
    const { userInfo } = useContext(UserInfoContext);
    const { dispatch } = useContext(NotificationContext);

    const styles = useStyles();

    const markNotificationRead = (notificationId: string) => {
        return Notification.markNotificationAsRead(notificationId, userInfo!.accessToken);
    }

    const onNotifCardClick = () => {
        if (toggleNotifMenu) {
            toggleNotifMenu(false);
        }

        notification.onClick();
        dispatch({ type: MARK_NOTIF_READ, payload: notification._id });
        markNotificationRead(notification._id);
    };

    return (
        <div className={styles.root} onClick={onNotifCardClick}>
            <div className={styles.leftContainer}>
                {!notification.read && (
                    <div className={styles.readIndicatorContainer}>
                        <FiberManualRecordIcon
                            className={styles.readIndicator}
                        />
                    </div>
                )}
                <div className={styles.iconContainer}>
                    <NotificationIcon iconKey={notification?.icon} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.messageContainer}>
                    <Typography className={styles.message} style={notification?.read ? {fontWeight: 'normal'} : {fontWeight: 'bold'}}>
                        {notification.message}
                    </Typography>
                </div>
                <div>
                    {notification.createdTimestamp && (
                        <Typography variant="caption">
                            {notification.createdTimestamp}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
