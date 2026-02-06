import React, { useContext } from "react";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import { useSnackbar } from "notistack";
import {
    RequestState,
    REQ_CANCEL_REQUEST_INTERPRETER_WARNING_TEXT,
    SNACK_APPT_CANCELLED_SUCCESS,
    SNACK_APPT_CANCELLED_ERROR,
} from "../../../../../config/constants";
import { statusCodes } from "../../../../../config/statusCodes";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import IRequest from "../../../../../config/types/entities/IRequest";
import CancelOption from "../CancelOption";
import Appointment from "../../../../../api/appointment";
import IAppointment from "../../../../../config/types/entities/IAppointment";
import {
    UPDATE_GUID,
    UPDATE_REQUEST,
} from "../../../../../shared/reducers/requestDetails";
import { leaveCometGroup } from "../../../../chat/services/CometGroupServices";

interface InterpreterCancelAssignmentButtonProps {
    buttonSize: "small" | "medium";
}

const InterpreterCancelAssignmentButton: React.FC<InterpreterCancelAssignmentButtonProps> =
    ({ buttonSize }) => {
        const { userInfo } = useContext(UserInfoContext);
        const { requestDetails, dispatch } = useContext(RequestDetailsContext);
        const { enqueueSnackbar } = useSnackbar();

        const cancelApptByInterpreter = async () => {
            await Appointment.delete(
                (requestDetails.request!.appointment as IAppointment)
                    ._id as string,
                userInfo!.accessToken
            )
                .then((response) => {
                    if (response.status === statusCodes.OK) {
                        const mockRequest: IRequest = {
                            ...requestDetails.request,
                            appointment: undefined,
                            state: RequestState.PENDING,
                        } as IRequest;

                        dispatch({
                            type: UPDATE_REQUEST,
                            payload: mockRequest,
                        });

                        if (requestDetails.cometGroupGuid) {
                            leaveCometGroup(requestDetails.cometGroupGuid).then(
                                () => {
                                    dispatch({
                                        type: UPDATE_GUID,
                                        payload: undefined,
                                    });
                                }
                            );
                        }

                        enqueueSnackbar(SNACK_APPT_CANCELLED_SUCCESS, {
                            variant: "success",
                        });
                    }
                })
                .catch((error) => {
                    enqueueSnackbar(SNACK_APPT_CANCELLED_ERROR, {
                        variant: "error",
                    });
                });
        };

        return (
            <CancelOption
                buttonSize={buttonSize}
                dialogContent={{
                    title: "Cancel Appointment?",
                    description: REQ_CANCEL_REQUEST_INTERPRETER_WARNING_TEXT,
                    confirmButtonMessage: "Cancel Appointment",
                }}
                handleCancel={cancelApptByInterpreter}
            />
        );
    };

export default InterpreterCancelAssignmentButton;
