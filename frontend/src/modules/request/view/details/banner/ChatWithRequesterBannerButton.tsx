import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { PALETTE } from "../../../../../config/colors";
import { COMET_GUID_TAKEN_ERROR_RECEIVED_TEXT } from "../../../../../config/constants";
import FrontendRoutes from "../../../../../config/frontendRoutes";
import IRequest from "../../../../../config/types/entities/IRequest";
import IRequester from "../../../../../config/types/entities/IRequester";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import { UPDATE_GUID } from "../../../../../shared/reducers/requestDetails";
import {
    createCometRequestGroup,
    createCometRequestGroupName,
} from "../../../../chat/services/CometGroupServices";
import { ChatStateNavigationWrapper } from "../../../../chat/types/NavigationState";

interface ChatWithRequesterBannerButtonProps {}

const useStyles = makeStyles(() => ({
    buttonContainer: {
        marginLeft: "2%",
        marginRight: "2%",
    },
    button: {
        backgroundColor: PALETTE.PRIMARY_ALT,
        color: PALETTE.BACKGROUND_WHITE,
    },
}));

const ChatWithRequesterBannerButton: React.FC<ChatWithRequesterBannerButtonProps> =
    () => {
        const styles = useStyles();
        const history = useHistory();

        const { userInfo } = useContext(UserInfoContext);
        const { requestDetails, dispatch } = useContext(RequestDetailsContext);

        const navigateToGroupChat = async (targetGuid: string) => {
            const state: ChatStateNavigationWrapper = {
                activeGuid: targetGuid,
            };

            history.push(FrontendRoutes.MESSAGES_ROUTE, state);
        };

        const onClickChat = async () => {
            // Create a group if doesn't exist.
            if (requestDetails.cometGroupGuid === undefined) {
                const groupName = createCometRequestGroupName(
                    requestDetails.request as IRequest
                );

                createCometRequestGroup(
                    requestDetails.request!._id!.toString(),
                    groupName,
                    [
                        (
                            requestDetails.request!.requester! as IRequester
                        )._id!.toString(),
                        userInfo!._id,
                    ]
                )
                    .then((targetGuid) => {
                        navigateToGroupChat(targetGuid);
                        dispatch({ type: UPDATE_GUID, payload: targetGuid });
                    })
                    .catch((error) => {
                        console.dir(error);
                    });
            } else {
                navigateToGroupChat(requestDetails.cometGroupGuid);
            }
        };

        return (
            <div className={styles.buttonContainer}>
                <Button
                    onClick={onClickChat}
                    className={styles.button}
                    variant="contained"
                    disabled={false}
                >
                    Chat
                </Button>
            </div>
        );
    };

export default ChatWithRequesterBannerButton;
