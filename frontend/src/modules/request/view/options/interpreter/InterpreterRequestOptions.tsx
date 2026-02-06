import { makeStyles, Tooltip } from "@material-ui/core";
import React, { useContext } from "react";
import { PALETTE } from "../../../../../config/colors";
import IAppointment from "../../../../../config/types/entities/IAppointment";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import useMobile from "../../../../../shared/hooks/useMobile";
import ChatOption from "../ChatOption";
import InterpreterCancelAssignmentButton from "./InterpreterCancelAssignmentButton";

interface InterpreterRequestOptionsProps {}

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
    },
    button: {
        margin: "2%",
        backgroundColor: PALETTE.PRIMARY_ALT,
        "&:hover": {
            backgroundColor: PALETTE.PRIMARY,
        },
    },
    icon: {
        color: "white",
    },
    buttonContainer: {
        padding: "1%",
    },
}));

const InterpreterRequestOptions: React.FC<InterpreterRequestOptionsProps> =
    () => {
        const styles = useStyles();
        const { requestDetails } = useContext(RequestDetailsContext);

        const onMobileView = useMobile();
        const buttonSize = onMobileView ? "small" : "medium";

        return (
            <div className={styles.container}>
                {requestDetails.request?.appointment && (
                    <>
                        <ChatOption
                            styles={styles}
                            buttonSize={buttonSize}
                            targetGuid={
                                (
                                    requestDetails.request
                                        ?.appointment as IAppointment
                                )._id!
                            }
                        />
                        <Tooltip title="Cancel">
                            <div className={styles.buttonContainer}>
                                <InterpreterCancelAssignmentButton
                                    buttonSize={buttonSize}
                                />
                            </div>
                        </Tooltip>
                    </>
                )}
            </div>
        );
    };

export default InterpreterRequestOptions;
