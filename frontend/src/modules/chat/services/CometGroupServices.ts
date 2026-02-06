import { CometChat } from "@cometchat-pro/chat";
import IRequest from "../../../config/types/entities/IRequest";
import IRequester from "../../../config/types/entities/IRequester";
import { getDateString } from "../../../utils/functions";

export const createCometRequestGroupName = (request: IRequest): string => {
    return `${(request.requester as IRequester).firstName} ∙ ${getDateString(
        new Date(request.date)
    )}`;
};

/**
 * Resolves with created group guid
 */
export const createCometRequestGroup = (
    appointmentId: string,
    groupName: string,
    memberIds: [string, string]
): Promise<string> => {
    const group = new CometChat.Group(
        appointmentId,
        groupName,
        CometChat.GROUP_TYPE.PRIVATE
    );

    return new Promise((resolve, reject) => {
        CometChat.createGroup(group)
            .then((group) => {
                const membersList = Array(2);

                memberIds.forEach((id) => {
                    const groupMember = new CometChat.GroupMember(
                        id,
                        CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
                    );
                    membersList.push(groupMember);
                });

                CometChat.addMembersToGroup(group.getGuid(), membersList, [])
                    .then(() => {
                        resolve(group.getGuid());
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getCometGroupInfo = (guid: string): Promise<CometChat.Group> => {
    return new Promise((resolve, reject) => {
        CometChat.getGroup(guid)
            .then((group) => {
                resolve(group);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const leaveCometGroup = (guid: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        CometChat.leaveGroup(guid)
            .then((success) => {
                resolve(success);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
