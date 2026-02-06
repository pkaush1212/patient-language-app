import React, { useContext, useReducer } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { PALETTE } from "../../config/colors";
import { NotificationContext } from "../../shared/contexts/NotificationContextProvider";
import { Badge, Box, IconButton, makeStyles, Popover } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import NotificationMenu from "./NotificationMenu";
import {
    MARK_ALL_SEEN,
    notificationReducer,
} from "../../shared/reducers/notification";
import NotificationController from "./controllers/NotificationController";
import NotificationWidget from "./NotificationWidget";
import Notification from "../../api/notification";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";

interface NotificationButtonProps {}

const useStyles = makeStyles((theme) => ({
    notificationBtn: {
        color: PALETTE.PRIMARY_ALT,
    },
    badge: {
        color: "#FFFFFF",
    },
    popover: {
        justifyContent: "space-between",
    },
    notifMenu: {
        height: "40vh",
        [theme.breakpoints.up("sm")]: {
            width: "40vh",
        },
        [theme.breakpoints.down("sm")]: {
            width: "90vw",
        },
    },
}));

const NotificationButton: React.FC<NotificationButtonProps> = () => {
    const styles = useStyles();
    const {userInfo} = useContext(UserInfoContext);

    const [notificationState, dispatch] = useReducer(notificationReducer, {
        notifications: [],
        countUnseen: 0,
        drawerOpen: false,
    });

    const markNotificationsSeen = async (notificationIds: string[]) => {
        return Notification.markNotificationsSeen(notificationIds, userInfo!.accessToken);        
    }

    const handleClickNotif = (open: boolean) => {
        if (open && notificationState.countUnseen > 0) {
            dispatch({ type: MARK_ALL_SEEN });
            const notificationIds = notificationState.notifications.map(notif => notif._id.toString());
            markNotificationsSeen(notificationIds);
        }
    };

    return (
        <NotificationContext.Provider value={{ notificationState, dispatch }}>
            <NotificationController />
            <NotificationWidget />
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div
                        onClick={() => {
                            handleClickNotif(popupState.isOpen);
                        }}
                    >
                        <IconButton
                            aria-label="notification"
                            {...bindTrigger(popupState)}
                        >
                            <Badge
                                badgeContent={notificationState?.countUnseen}
                                color="primary"
                                overlap="circle"
                            >
                                <NotificationsIcon
                                    className={styles.notificationBtn}
                                />
                            </Badge>
                        </IconButton>

                        <Popover
                            className={styles.popover}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <Box className={styles.notifMenu}>
                                <NotificationMenu
                                    toggleNotifMenu={(menuOpen) => {
                                        popupState.setOpen(menuOpen);
                                    }}
                                />
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </NotificationContext.Provider>
    );
};

export default NotificationButton;
