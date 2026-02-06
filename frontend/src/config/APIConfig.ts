import { AxiosRequestConfig } from "axios";

export const authorizationHeader = (token: string): AxiosRequestConfig => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
};
