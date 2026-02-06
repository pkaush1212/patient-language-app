import { makeStyles } from "@material-ui/styles";
import React from "react";
import newRequestVector from "../../assets/notification_add.png";
import reqStateUpdateVector from "../../assets/notification_add.png";

export enum NotifIcons {
    NEW_REQUEST,
    REQ_STATE_UPDATE,
}

interface NotificationIconProps {
    iconKey: NotifIcons;
}

const useStyles = makeStyles(() => ({
    iconContainer: {
        padding: "1%",
    },
}));

const NotificationIcon: React.FC<NotificationIconProps> = ({ iconKey }) => {
    const styles = useStyles();

    return (
        <div className={styles.iconContainer}>
            {iconKey === NotifIcons.NEW_REQUEST && (
                <img src={newRequestVector} />
            )}
            {iconKey === NotifIcons.REQ_STATE_UPDATE && (
                <img src={reqStateUpdateVector} />
            )}
        </div>
    );
};

export default NotificationIcon;
