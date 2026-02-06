import { CometChat } from "@cometchat-pro/chat";
import { UserInfo } from "../../../shared/contexts/UserContextProvider";
import { IUserDetail } from "../../../shared/contexts/UserDetailsContextProvider";
import {
    COMET_CHAT_APP_ID,
    COMET_CHAT_AUTH_KEY,
    COMET_CHAT_REGION,
} from "../../../utils/secrets";

export const initCometChat = () => {
    return new Promise((resolve, reject) => {
        const appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(COMET_CHAT_REGION)
            .build();

        CometChat.init(COMET_CHAT_APP_ID, appSetting).then(
            () => {
                resolve("initialized");
            },
            (error) => {
                reject(error);
            }
        );
    });
};

/** Authentication Services  */
export const createCometChatUser = (
    userInfo: UserInfo,
    userDetails: IUserDetail
) => {
    const CometUser = new CometChat.User(userInfo._id);
    CometUser.setUid(userInfo._id);
    CometUser.setName(`${userDetails.firstName} ${userDetails.lastName}`);

    return new Promise((resolve, reject) => {
        CometChat.createUser(CometUser, COMET_CHAT_AUTH_KEY!)
            .then((user) => {
                console.log("Created Comet User", user);
                resolve(user);
            })
            .catch((error) => {
                console.log("Error creating user!", error);
                reject(error);
            });
    });
};

/**
 * Returns promise on whether login was successful
 * @param userInfo
 * @param userDetails
 * @returns
 */
export const loginUserToChat = (
    userInfo: UserInfo,
    userDetails: IUserDetail
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        CometChat.login(userInfo?._id, COMET_CHAT_AUTH_KEY)
            .then((user) => {
                resolve(true);
            })
            .catch((error) => {
                console.log("Error logging in!", error);
                if (error.code === "ERR_UID_NOT_FOUND") {
                    /* Need to create user */
                    createCometChatUser(userInfo, userDetails).then(() => {
                        loginUserToChat(userInfo, userDetails)
                            .then((_) => resolve(true))
                            .catch((_) => reject(false));
                    });
                } else {
                    reject(false);
                }
            });
    });
};
