import {
    Button,
    createStyles,
    Dialog,
    IconButton,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

interface DialogWithContentProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onSubmit: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            width: "100vw",
            overflowX: "hidden",
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
        overflowX: "hidden",
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        overflowX: "hidden",
    },
}))(MuiDialogActions);

const DialogWithContent: React.FC<DialogWithContentProps> = ({
    open,
    title,
    children,
    onClose,
    onSubmit,
}) => {
    const titleId = `modal-title-${title}`;

    return (
        <Dialog onClose={onClose} open={open} scroll="paper">
            <DialogTitle id={titleId} onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onSubmit} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogWithContent;
