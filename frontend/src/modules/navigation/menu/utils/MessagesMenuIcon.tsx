import React, { useEffect, useState, useContext } from "react";
import { Badge, makeStyles } from "@material-ui/core";
import { MessageOutlined } from "@material-ui/icons";
import { getCometUnreadMessageCountForUser } from "../../../chat/services/CometMessageServices";
import { UserInfoContext } from "../../../../shared/contexts/UserContextProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    container: {},
}));

export const MessagesMenuIcon: React.FC<{}> = () => {
    const styles = useStyles();
    const history = useHistory();
    const { userInfo } = useContext(UserInfoContext);
    const [unreadMsgCount, setUnreadMsgCount] = useState<number>(0);

    const retrieveAndSetMsgCount = async () => {
        const unreadMessageCount = await getCometUnreadMessageCountForUser();
        setUnreadMsgCount(unreadMessageCount);
    };

    useEffect(() => {
        if (userInfo?.isLoggedInToChat) {
            retrieveAndSetMsgCount();
        }
    }, [userInfo?.isLoggedInToChat, history]);

    return (
        <div className={styles.container}>
            <Badge
                badgeContent={unreadMsgCount}
                color="primary"
                overlap="circle"
            >
                <MessageOutlined />
            </Badge>
        </div>
    );
};
