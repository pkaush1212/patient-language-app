import { IconButton, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { PALETTE } from "../../../config/colors";
import EditIcon from "@material-ui/icons/Edit";
import RequestDialog from "../RequestDialog";
import { RequestFormModes } from "../RequestForm";

interface EditRequestButtonProps {
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

const EditRequestButton: React.FC<EditRequestButtonProps> = ({
    buttonSize,
}) => {
    const styles = useStyles();

    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <IconButton
                    className={styles.button}
                    aria-label="edit"
                    size={buttonSize}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <EditIcon fontSize="small" className={styles.icon} />
                </IconButton>
            </div>
            <div>
                <RequestDialog
                    title="Edit Request"
                    mode={RequestFormModes.EDIT}
                    open={open}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
};

export default EditRequestButton;
