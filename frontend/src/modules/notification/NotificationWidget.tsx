import { makeStyles, Drawer, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import {
    INotificationModel,
    NotificationContext,
} from "../../shared/contexts/NotificationContextProvider";
import { TOGGLE_NOTIF_DRAWER } from "../../shared/reducers/notification";
import NotificationCard from "./NotificationCard";

const drawerWidth = 500;

const useStyles = makeStyles(() => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: "transparent",
    },
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        alignSelf: "center",
        marginTop: "5%",
    },
    notifCardsContainer: {
        display: "flex",
        flexDirection: "column",
        maxHeight: "95vh",
        paddingLeft: "3%",
        overflow: "auto",
    },
}));
interface NotificationWidgetProps {}

const NotificationWidget: React.FC<NotificationWidgetProps> = () => {
    const { notificationState, dispatch } = useContext(NotificationContext);
    const styles = useStyles();

    const closeNotifMenu = () => {
        dispatch({ type: TOGGLE_NOTIF_DRAWER, payload: false });
    };

    return (
        <Drawer
            className={styles.drawer}
            classes={{
                paper: styles.drawerPaper,
            }}
            open={notificationState?.drawerOpen}
            anchor="right"
            onClose={closeNotifMenu}
        >
            <div className={styles.title}>
                <Typography variant="h5">All Notifications</Typography>
            </div>
            <div className={styles.notifCardsContainer}>
                {notificationState?.notifications.map(
                    (notification: INotificationModel) => {
                        return (
                            <NotificationCard
                                notification={notification}
                                toggleNotifMenu={() => {}}
                            />
                        );
                    }
                )}
            </div>
        </Drawer>
    );
};

export default NotificationWidget;
