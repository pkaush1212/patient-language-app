import React from "react";
import Helmet from "react-helmet";
import { useLocation } from "react-router";
import { MESSAGES_TITLE } from "../../config/constants";
import MainChatWidget from "../../modules/chat/MainChatWidget";
import { ChatStateNavigationWrapper } from "../../modules/chat/types/NavigationState";

interface MessagesPageProps {}

const MessagesPage: React.FC<MessagesPageProps> = () => {
    const location = useLocation();

    return (
        <React.Fragment>
            <Helmet>
                <title>{MESSAGES_TITLE}</title>
            </Helmet>
            <MainChatWidget
                chatWithGroupId={
                    (location.state as ChatStateNavigationWrapper)?.activeGuid
                }
            />
        </React.Fragment>
    );
};

export default MessagesPage;
