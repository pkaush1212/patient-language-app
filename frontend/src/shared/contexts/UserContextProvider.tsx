import React from "react";
import { UserTypes } from "../../config/constants";

export interface UserInfo {
    _id: string;
    _type: UserTypes;
    isVerified: boolean;
    accessToken: string;
    refreshToken?: string;
    isLoggedInToChat?: boolean;
}

interface IUserInfoContext {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void | null;
}

export const UserInfoContext = React.createContext({} as IUserInfoContext);
