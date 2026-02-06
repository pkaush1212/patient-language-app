import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { PALETTE } from "../../../../config/colors";
import ConfirmationDialog from "../../../../ui/Elements/ConfirmationDialog";

interface CancelOptionProps {
    buttonSize: "small" | "medium";
    dialogContent: {
        title: string;
        description: string;
        confirmButtonMessage: string;
    };
    handleCancel: () => void;
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

const CancelOption: React.FC<CancelOptionProps> = ({
    buttonSize,
    dialogContent,
    handleCancel,
}) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <IconButton
                className={styles.button}
                aria-label="cancel"
                onClick={() => setOpen(true)}
                size={buttonSize}
            >
                <CancelIcon fontSize="small" className={styles.icon} />
            </IconButton>
            <ConfirmationDialog
                open={open}
                setOpen={setOpen}
                canonicalClassName="cancel-request"
                content={dialogContent}
                onConfirmAction={() => {
                    setOpen(false);
                    return handleCancel();
                }}
            />
        </React.Fragment>
    );
};

export default CancelOption;
