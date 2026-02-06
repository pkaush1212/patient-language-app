import React, { useContext, useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { PALETTE } from "../../../../../config/colors";
import { RequestDetailsContext } from "../../../../../shared/contexts/RequestDetailsContextProvider";
import { useHistory } from "react-router";
import Request from "../../../../../api/request";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import { statusCodes } from "../../../../../config/statusCodes";
import { useSnackbar } from "notistack";
import {
    SNACK_REQ_DELETED_ERROR,
    SNACK_REQ_DELETED_SUCCESS,
} from "../../../../../config/constants";
import ConfirmationDialog from "../../../../../ui/Elements/ConfirmationDialog";
import { CLEAR_REQUEST_DETAILS } from "../../../../../shared/reducers/requestDetails";

interface DeleteRequestButtonProps {
    buttonSize: "small" | "medium";
}

const useStyles = makeStyles(() => ({
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
}));

const DeleteRequestButton: React.FC<DeleteRequestButtonProps> = ({
    buttonSize,
}) => {
    const styles = useStyles();
    const history = useHistory();
    const { userInfo } = useContext(UserInfoContext);
    const { requestDetails, dispatch } = useContext(RequestDetailsContext);
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await Request.delete(
            requestDetails.request!._id as string,
            userInfo!.accessToken
        ).then((response) => {
            if (response.status === statusCodes.OK) {
                history.goBack();
                enqueueSnackbar(SNACK_REQ_DELETED_SUCCESS, {
                    variant: "success",
                });
                dispatch({ type: CLEAR_REQUEST_DETAILS });
            } else {
                enqueueSnackbar(SNACK_REQ_DELETED_ERROR, { variant: "error" });
            }
        });
    };

    return (
        <React.Fragment>
            <IconButton
                className={styles.button}
                aria-label="delete"
                onClick={() => setOpen(true)}
                size={buttonSize}
            >
                <DeleteIcon fontSize="small" className={styles.icon} />
            </IconButton>
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                canonicalClassName="delete-request"
                content={{
                    title: "Delete Request?",
                    description:
                        "NOTE: This action is irreversible. Deleting this request will remove it permanently from your feed.",
                    confirmButtonMessage: "Delete Request",
                }}
                onConfirmAction={() => {
                    setOpen(false);
                    return handleDelete();
                }}
            />
        </React.Fragment>
    );
};

export default React.memo(DeleteRequestButton);
