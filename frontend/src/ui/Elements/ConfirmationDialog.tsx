import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";
import React from "react";

interface ConfirmationDialogProps {
    open: boolean;
    setOpen;
    canonicalClassName: string;
    content: {
        title: string;
        description: string;
        confirmButtonMessage: string;
    };
    onConfirmAction;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    setOpen,
    canonicalClassName,
    content,
    onConfirmAction,
}) => {
    const { title, description, confirmButtonMessage } = content;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby={`${canonicalClassName}-confirmation`}
        >
            <DialogTitle id={canonicalClassName}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id={`${canonicalClassName}-description`}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Close
                </Button>
                <Button onClick={onConfirmAction} color="primary" autoFocus>
                    {confirmButtonMessage}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
