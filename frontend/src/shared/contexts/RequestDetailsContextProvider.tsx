import React from "react";
import IRequest from "../../config/types/entities/IRequest";

export interface IRequestDetails {
    request: IRequest | null;
    cometGroupGuid?: string;
}

interface IRequestDetailsContext {
    requestDetails: IRequestDetails;
    dispatch: React.Dispatch<any>;
}

export const RequestDetailsContext = React.createContext(
    {} as IRequestDetailsContext
);
