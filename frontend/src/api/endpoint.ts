import axios, { AxiosError, AxiosInstance, AxiosPromise } from "axios";
import { AxiosRequestConfig } from "axios";
import { USER_INFO_KEY } from "../config/constants";
import { statusCodes } from "../config/statusCodes";
import ErrorResponse from "../config/types/errorResponse";

export default class Endpoint {
    private name: string;
    private _axios: AxiosInstance;

    constructor(name: string, resourceURL: string) {
        this.name = name;

        this._axios = axios.create({
            baseURL: resourceURL,
            withCredentials: false,
        });

        // Hook default interceptor
        this._axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                if (!error.response) {
                    /*
                    No Internet Connection
                    */
                    return Promise.reject({
                        error: true,
                        status: statusCodes.TIMEOUT,
                        message:
                            "Uh oh! You seem to be offline. Please check your internet connection",
                    });
                }

                if (error.response?.status === statusCodes.UNAUTHORIZED) {
                    /*
                        The token supplied is invalid.
                        Prompt user to log in again.
                    */
                    if (localStorage.getItem(USER_INFO_KEY)) {
                        localStorage.clear();
                        window.location.reload();
                    }
                }

                // reject with error, as ErrorResponse if any data.
                try {
                    const errorResponse: ErrorResponse = error.response.data;
                    return Promise.reject(errorResponse);
                } catch {
                    return Promise.reject(error);
                }
            }
        );
    }

    /**
     * Get a specific resource
     * @param {*} id the the id for a given resource
     * @param {AxiosRequestConfig} config
     */
    public getOne(_id: string, config: AxiosRequestConfig = {}): AxiosPromise {
        return this._axios.get(_id, config);
    }

    /**
     * Get all resources
     * @param {AxiosRequestConfig} config
     */
    public getAll(
        config: AxiosRequestConfig = {},
        subUrl?: string
    ): AxiosPromise {
        return this._axios.get(subUrl ?? "", config);
    }

    /**
     * Create a specified resource by calling axios.post
     * @param {*} toCreate object to create.
     * @param {subURL?: string, config?: AxiosRequestConfig} options a subURL, which is appended to resourceURL, and the AxiosRequestConfig.
     */
    public create(
        toCreate: any,
        options?: {
            subUrl?: string;
            config?: AxiosRequestConfig;
        }
    ): AxiosPromise {
        const url = options && options.subUrl ? `${options.subUrl}` : "";
        const config = options && options.config ? options.config : {};
        return this._axios.post(url, toCreate, config);
    }

    /**
     * Update a specified resource by calling axios.put
     * @param {{id:string}} object object to update. Should contain an id.
     * @param {*} toUpdate the update data.
     * @param {AxiosRequestConfig} config
     */
    public update(
        _id: string,
        toUpdate: any,
        config: AxiosRequestConfig = {}
    ): AxiosPromise {
        return this._axios.put(_id, toUpdate, config);
    }

    /**
     * Delete a specified resource by calling axios.delete
     * @param {{id:string}} object object to delete. Must contain an id.
     * @param {AxiosRequestConfig} config
     */
    public delete(_id: string, config: AxiosRequestConfig = {}): AxiosPromise {
        return this._axios.delete(_id, config);
    }

    /**
     * Gets the name of api
     */
    public getName(): string {
        return this.name;
    }
}
