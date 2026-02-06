import { useState } from "react";
import { USER_INFO_KEY } from "../../config/constants";
import { UserInfo } from "../contexts/UserContextProvider";

/*
User Info hook to store into localStorage.
-> set user info as null to logout.
*/
const useUserInfo = () => {
    const getUserInfo = () => {
        const serializedUserInfo = localStorage.getItem(USER_INFO_KEY);

        if (!serializedUserInfo) {
            return null;
        }

        const userInfo: UserInfo = JSON.parse(serializedUserInfo);
        return userInfo;
    };

    const [userInfo, setUserInfo] = useState(getUserInfo());

    const saveUserInfo = (userInfo: UserInfo | null) => {
        if (userInfo == null) {
            // clear localstorage.
            localStorage.clear();
            setUserInfo(null);
            return;
        }

        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        setUserInfo(userInfo);
    };

    return {
        userInfo,
        setUserInfo: saveUserInfo,
    };
};

export default useUserInfo;
