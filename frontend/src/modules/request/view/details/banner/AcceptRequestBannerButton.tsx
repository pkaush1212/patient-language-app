import { Button, makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import Appointment from "../../../../../api/appointment";
import { PALETTE } from "../../../../../config/colors";
import {
    RequestState,
    SNACK_APPT_CREATED_ERROR,
    SNACK_APPT_CREATED_SUCCESS,
} from "../../../../../config/constants";
import IAppointment from "../../../../../config/types/entities/IAppointment";
import IRequest from "../../../../../config/types/entities/IRequest";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import {
    UPDATE_GUID,
    UPDATE_REQUEST,
} from "../../../../../shared/reducers/requestDetails";
import {
    createCometRequestGroupName,
    createCometRequestGroup,
} from "../../../../chat/services/CometGroupServices";

interface AcceptRequestBannerButtonProps {}

const useStyles = makeStyles(() => ({
    buttonContainer: {
        marginLeft: "2%",
        marginRight: "2%",
    },
    button: {
        backgroundColor: "#25C168",
        color: PALETTE.BACKGROUND_WHITE,
    },
}));

const AcceptRequestBannerButton: React.FC<AcceptRequestBannerButtonProps> =
    () => {
        const { userInfo } = useContext(UserInfoContext);
        const { requestDetails, dispatch } = useContext(RequestDetailsContext);

        const { enqueueSnackbar } = useSnackbar();

        const [isSubmitting, setIsSubmitting] = useState(false);

        const styles = useStyles();

        const acceptRequest = async () => {
            const appointment: IAppointment = {
                interpreter: userInfo!._id,
                requester: requestDetails.request!.requester!._id.toString(),
                request: requestDetails.request!._id!.toString(),
            };

            Appointment.create(appointment, userInfo!.accessToken)
                .then(async (res) => {
                    const appointment: IAppointment = res.data;

                    const mockRequest = {
                        ...requestDetails.request,
                        appointment: appointment._id,
                        state: RequestState.MATCHED,
                    };

                    dispatch({ type: UPDATE_REQUEST, payload: mockRequest });

                    if (requestDetails.cometGroupGuid === undefined) {
                        const groupName = createCometRequestGroupName(
                            requestDetails.request as IRequest
                        );

                        const guid = await createCometRequestGroup(
                            appointment._id!.toString(),
                            groupName,
                            [
                                appointment.requester.toString(),
                                appointment.interpreter.toString(),
                            ]
                        );

                        if (guid) {
                            // set request chat group guid
                            dispatch({ type: UPDATE_GUID, payload: guid });
                        }
                    }

                    enqueueSnackbar(SNACK_APPT_CREATED_SUCCESS, {
                        variant: "success",
                    });
                })
                .catch((error) => {
                    enqueueSnackbar(SNACK_APPT_CREATED_ERROR, {
                        variant: "error",
                    });
                });
        };

        const onClickAcceptRequestButton = async (e) => {
            setIsSubmitting(true);
            await acceptRequest();
            setIsSubmitting(false);
        };

        return (
            <div className={styles.buttonContainer}>
                <Button
                    onClick={(e) => onClickAcceptRequestButton(e)}
                    className={styles.button}
                    variant="contained"
                    disabled={isSubmitting}
                >
                    Accept
                </Button>
            </div>
        );
    };

export default AcceptRequestBannerButton;
