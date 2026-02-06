import API from "./api";
import { APIRoute } from "../config/APIRoute";
import { AxiosPromise } from "axios";
import { UserTypes } from "../config/constants";
import ErrorResponse from "../config/types/errorResponse";
import { IAuthResponse } from "../config/types/APICustomResponse";
import { authorizationHeader } from "../config/APIConfig";

class AuthAPI {
    constructor() {
        const routes = [
            APIRoute.AUTH_LOGIN_INTERPRETER,
            APIRoute.AUTH_LOGIN_REQUESTER,
            APIRoute.AUTH_FORGOT_PASS,
            APIRoute.AUTH_RESET_PASS,
            APIRoute.AUTH_RESET_PASS_LOGGEDIN,
            APIRoute.AUTH_VERIFY_EMAIL,
            APIRoute.AUTH_VERIFY_TEAM,
            APIRoute.AUTH_VERIFY_CHECK,
            APIRoute.AUTH_VERIFY_RESEND,
        ];

        API.createEntities(routes);
    }

    public login(
        email: string,
        password: string,
        userType: UserTypes
    ): AxiosPromise<IAuthResponse> {
        return userType === UserTypes.INTERPRETER
            ? API.getEndpoint(APIRoute.AUTH_LOGIN_INTERPRETER).create({
                  email,
                  password,
              })
            : API.getEndpoint(APIRoute.AUTH_LOGIN_REQUESTER).create({
                  email,
                  password,
              });
    }

    /**
     *
     * @param token jwt token from query parameters
     * @returns
     */
    public verifyEmail(token: string): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.AUTH_VERIFY_EMAIL).getAll({}, token);
    }

    /**
     * check if the user provided is already verified.
     * @param token JWT Token
     * @param type User type
     * @returns
     */
    public checkIfVerified(
        token: string,
        type: string
    ): AxiosPromise<IAuthResponse> {
        return API.getEndpoint(APIRoute.AUTH_VERIFY_CHECK).create({
            type,
            token,
        });
    }

    /**
     * send a forgot password email with reset token
     * @param email
     * @returns
     */
    public forgotPassword(email: string): AxiosPromise<any> {
        return API.getEndpoint(APIRoute.AUTH_FORGOT_PASS).create({
            email,
        });
    }

    public resetPassword(
        password: string,
        resetToken: string
    ): AxiosPromise<any> {
        return API.getEndpoint(APIRoute.AUTH_RESET_PASS).create({
            password,
            token: resetToken,
        });
    }

    public resetPasswordOldNew(
        oldPassword: string,
        newPassword: string,
        token: string
    ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.AUTH_RESET_PASS_LOGGEDIN).create(
            {
                oldPassword,
                newPassword,
            },
            {
                config: authorizationHeader(token),
            }
        );
    }

    public resendVerificationEmail(
        token: string
    ): AxiosPromise<any | ErrorResponse> {
        return API.getEndpoint(APIRoute.AUTH_VERIFY_RESEND).create(
            {},
            {
                config: authorizationHeader(token),
            }
        );
    }
}

export const Auth = new AuthAPI();
export default Auth;
