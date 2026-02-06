import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import React, { useContext } from "react";
import { PALETTE } from "../../../../../config/colors";
import CancelRequestButton from "./CancelRequestButton";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import { RequestState } from "../../../../../config/constants";
import DeleteRequestButton from "./DeleteRequestButton";
import useMobile from "../../../../../shared/hooks/useMobile";
import ChatOption from "../ChatOption";
import IAppointment from "../../../../../config/types/entities/IAppointment";
import EditRequestButton from "../../../edit/EditRequestButton";

interface RequesterRequestOptionsProps {}

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

const RequesterRequestOptions: React.FC<RequesterRequestOptionsProps> = () => {
    const styles = useStyles();
    const { requestDetails } = useContext(RequestDetailsContext);

    const onMobileView = useMobile();
    const buttonSize = onMobileView ? "small" : "medium";

    return (
        <div className={styles.container}>
            {requestDetails.request?.appointment && (
                <ChatOption
                    styles={styles}
                    buttonSize={buttonSize}
                    targetGuid={
                        (requestDetails.request?.appointment as IAppointment)
                            ._id!
                    }
                />
            )}

            {requestDetails.request?.date && new Date(requestDetails.request!.date).getTime() >= Date.now() && (
                <Tooltip title="Edit">
                    <div className={styles.buttonContainer}>
                        <EditRequestButton buttonSize={buttonSize} />
                    </div>
                </Tooltip>
            )}

            {requestDetails.request?.state === RequestState.PENDING && (
                <Tooltip title="Cancel">
                    <div className={styles.buttonContainer}>
                        <CancelRequestButton buttonSize={buttonSize} />
                    </div>
                </Tooltip>
            )}

            <Tooltip title="Delete">
                <div className={styles.buttonContainer}>
                    <DeleteRequestButton buttonSize={buttonSize} />
                </div>
            </Tooltip>
        </div>
    );
};

export default RequesterRequestOptions;
