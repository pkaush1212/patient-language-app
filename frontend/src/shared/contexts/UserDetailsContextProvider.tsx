import React from "react";
import { UserTypes } from "../../config/constants";

export interface IUserDetail {
    firstName: string;
    lastName: string;
    email: string;
    initials: string;
    userType: UserTypes;
}

interface IUserDetailsContext {
    userDetail: IUserDetail | null;
    setUserDetail: (userDetail: IUserDetail | null) => void | null;
}

export const UserDetailsContext = React.createContext(
    {} as IUserDetailsContext
);
