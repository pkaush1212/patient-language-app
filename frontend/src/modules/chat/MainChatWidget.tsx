import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { CometChatConversationListWithMessages } from "../../vendor/cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import AppointmentPane from "./AppointmentPane";

interface MainChatWidgetProps {
    chatWithGroupId?: string;
    chatWithUserId?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        width: "100%",
    },
    container: {
        flex: 3,
        height: "90vh",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
        },
    },
    apptPane: {
        flex: 1,
        height: "90vh",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const MainChatWidget: React.FC<MainChatWidgetProps> = ({
    chatWithGroupId = "",
    chatWithUserId = "",
}) => {
    const styles = useStyles();
    const [guid, setGuid] = useState<string | null>(null);

    useEffect(() => {
        if (chatWithGroupId !== "") {
            setGuid(chatWithGroupId);
        }
    }, [chatWithGroupId]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <CometChatConversationListWithMessages
                    chatWithGroup={chatWithGroupId}
                    chatWithUser={chatWithUserId}
                    friendsOnly={true}
                    updateParentItemContext={(guid) => setGuid(guid)}
                />
            </div>
            <div className={styles.apptPane}>
                {guid && <AppointmentPane guid={guid} />}
            </div>
        </div>
    );
};

export default MainChatWidget;
