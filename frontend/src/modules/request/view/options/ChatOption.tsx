import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import { useHistory } from "react-router-dom";
import FrontendRoutes from "../../../../config/frontendRoutes";
import { ChatStateNavigationWrapper } from "../../../chat/types/NavigationState";

interface ChatOptionProps {
    styles;
    buttonSize?: "small" | "medium";
    targetGuid: string;
}

const ChatOption: React.FC<ChatOptionProps> = ({
    styles,
    buttonSize,
    targetGuid,
}) => {
    const history = useHistory();

    return (
        <Tooltip title="Chat">
            <div className={styles.buttonContainer}>
                <IconButton
                    className={styles.button}
                    aria-label="chat"
                    size={buttonSize}
                    onClick={() => {
                        const state: ChatStateNavigationWrapper = {
                            activeGuid: targetGuid,
                        };
                        history.push(FrontendRoutes.MESSAGES_ROUTE, state);
                    }}
                >
                    <ChatIcon fontSize="small" className={styles.icon} />
                </IconButton>
            </div>
        </Tooltip>
    );
};

export default ChatOption;
