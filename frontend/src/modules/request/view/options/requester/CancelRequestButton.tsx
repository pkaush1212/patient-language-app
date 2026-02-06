import React, { useContext } from "react";
import {
    IRequestDetails,
    RequestDetailsContext,
} from "../../../../../shared/contexts/RequestDetailsContextProvider";
import Request from "../../../../../api/request";
import { useSnackbar } from "notistack";
import {
    SNACK_REQ_CANCELLED_SUCCESS,
    SNACK_REQ_CANCELLED_ERROR,
    RequestState,
    REQ_CANCEL_REQUEST_REQUESTER_WARNING_TEXT,
} from "../../../../../config/constants";
import { statusCodes } from "../../../../../config/statusCodes";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import IRequest from "../../../../../config/types/entities/IRequest";
import CancelOption from "../CancelOption";
import { leaveCometGroup } from "../../../../chat/services/CometGroupServices";
import {
    UPDATE_GUID,
    UPDATE_REQUEST,
} from "../../../../../shared/reducers/requestDetails";

interface CancelRequestButtonProps {
    buttonSize: "small" | "medium";
}

const CancelRequestButton: React.FC<CancelRequestButtonProps> = ({
    buttonSize,
}) => {
    const { userInfo } = useContext(UserInfoContext);
    const { requestDetails, dispatch } = useContext(RequestDetailsContext);
    const { enqueueSnackbar } = useSnackbar();

    const cancelReqByRequester = async () => {
        await Request.cancel(
            requestDetails.request!._id as string,
            userInfo!.accessToken
        )
            .then(async (response) => {
                if (response.status === statusCodes.OK) {
                    const mockRequest: IRequest = {
                        ...requestDetails.request,
                        state: RequestState.CANCELLED,
                    } as IRequest;

                    if (requestDetails.cometGroupGuid) {
                        await leaveCometGroup(requestDetails.cometGroupGuid).then(
                            () => {
                                dispatch({
                                    type: UPDATE_GUID,
                                    payload: undefined,
                                });
                            }
                        );
                    }

                    enqueueSnackbar(SNACK_REQ_CANCELLED_SUCCESS, {
                        variant: "success",
                    });

                    dispatch({ type: UPDATE_REQUEST, payload: mockRequest });
                }
            })
            .catch((error) => {
                enqueueSnackbar(SNACK_REQ_CANCELLED_ERROR, {
                    variant: "error",
                });
            });
    };

    return (
        <CancelOption
            buttonSize={buttonSize}
            dialogContent={{
                title: "Cancel Request?",
                description: REQ_CANCEL_REQUEST_REQUESTER_WARNING_TEXT,
                confirmButtonMessage: "Cancel Request",
            }}
            handleCancel={cancelReqByRequester}
        />
    );
};

export default CancelRequestButton;
