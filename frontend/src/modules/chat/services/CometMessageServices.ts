import { CometChat } from "@cometchat-pro/chat";

/**
 * Retrieve how many unread messages for current user.
 * @returns
 */
export const getCometUnreadMessageCountForUser = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        CometChat.getUnreadMessageCount().then((result) => {
            /**
             * Sum up all the values as per API response.
             */
            try {
                const msgCount: number = (
                    Object.values({
                        ...result["users"],
                        ...result["groups"],
                    }) as number[]
                ).reduce((a, b) => a + b, 0);

                resolve(msgCount);
            } catch {
                reject(0);
            }
        });
    });
};

export const sendTransientMessageToChat = (
    groupOrUserChatId: string,
    message: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        resolve(true);
        reject();
    });
};
