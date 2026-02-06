import Interpreter from "../../api/interpreter";
import Requester from "../../api/requester";
import { UserTypes } from "../../config/constants";
import IInterpreter from "../../config/types/entities/IInterpreter";
import IRequester from "../../config/types/entities/IRequester";
import { UserInfo } from "../../shared/contexts/UserContextProvider";
import { IUserDetail } from "../../shared/contexts/UserDetailsContextProvider";

const fetchRequester = async (
    userInfo: UserInfo
): Promise<IUserDetail | null> => {
    return new Promise((resolve, reject) => {
        Requester.getById(userInfo!._id, userInfo!.accessToken)
            .then((res) => {
                const requester: IRequester = res.data;

                const userDetail: IUserDetail = {
                    firstName: requester.firstName,
                    lastName: requester.lastName,
                    email: requester.email,
                    initials:
                        requester.firstName.charAt(0) +
                        requester.lastName.charAt(0),
                    userType: UserTypes.REQUESTER
                };
                resolve(userDetail);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const fetchInterpreter = async (
    userInfo: UserInfo
): Promise<IUserDetail | null> => {
    return new Promise((resolve, reject) => {
        Interpreter.getById(userInfo!._id, userInfo!.accessToken)
            .then((res) => {
                const interpreter: IInterpreter = res.data;
                const userDetail: IUserDetail = {
                    firstName: interpreter.firstName,
                    lastName: interpreter.lastName,
                    email: interpreter.email,
                    initials:
                        interpreter.firstName.charAt(0) +
                        interpreter.lastName.charAt(0),
                    userType: UserTypes.INTERPRETER
                };

                resolve(userDetail);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const fetchUserDetails = async (
    userInfo: UserInfo | null
): Promise<IUserDetail | null> => {
    switch (userInfo?._type) {
        case UserTypes.INTERPRETER:
            return fetchInterpreter(userInfo);
        case UserTypes.REQUESTER:
            return fetchRequester(userInfo);
        default:
            return null;
    }
};
