import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core";

export interface MoreActionsNotificationButtonProps {}

const useStyles = makeStyles(() => ({
    moreActions: {
        flexDirection: "row",
        right: "1%",
        alignContent: "flex-end",
        alignSelf: "flex-end",
        justifyContent: "flex-end",
    },
}));

const MoreActionsNotificationButton: React.FC<MoreActionsNotificationButtonProps> =
    () => {
        const styles = useStyles();
        return (
            <div className={styles.moreActions}>
                <MoreHorizIcon fontSize="small" />
            </div>
        );
    };

export default MoreActionsNotificationButton;
