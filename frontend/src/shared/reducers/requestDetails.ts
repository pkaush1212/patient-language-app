import IRequest from "../../config/types/entities/IRequest";
import { IRequestDetails } from "../contexts/RequestDetailsContextProvider";
import { Action } from "./common";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_GUID = "UPDATE_GUID";
export const CLEAR_REQUEST_DETAILS = "CLEAR_REQUEST_DETAILS";

export interface UPDATE_REQUEST_ACTION extends Action {
    payload: IRequest;
}

export interface UPDATE_GUID extends Action {
    payload: string;
}

export type CLEAR_REQUEST_DETAILS = Action;

export const requestDetailsReducer = (
    state: IRequestDetails,
    action: Action
): IRequestDetails => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state,
                request: (action as UPDATE_REQUEST_ACTION).payload,
            };
        case UPDATE_GUID:
            return {
                ...state,
                cometGroupGuid: (action as UPDATE_GUID).payload,
            };
        case CLEAR_REQUEST_DETAILS:
            return {
                request: null,
            };
        default:
            throw new Error("Action not recognized");
    }
};
