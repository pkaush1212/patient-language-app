import * as QueryString from "query-string";
import { IAuthResponse } from "../config/types/APICustomResponse";
import { UserInfo } from "../shared/contexts/UserContextProvider";
import { UserTypes } from "../config/constants";

export const getTokenFromQuery = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const queries = QueryString.parse(window.location.search);

        if (!queries.token) {
            reject("Token not present in the query body");
        }

        resolve(queries.token as string);
    });
};

export const mapAuthResponseToUserInfo = (
    authResponse: IAuthResponse
): UserInfo => {
    return {
        _id: authResponse.user._id!,
        isVerified: authResponse.user.isVerified!,
        _type: authResponse.user.__t as UserTypes,
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
    };
};
