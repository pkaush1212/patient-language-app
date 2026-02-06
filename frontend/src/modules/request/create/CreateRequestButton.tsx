import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { PALETTE } from "../../../config/colors";
import useMobile from "../../../shared/hooks/useMobile";
import RequestDialog from "../RequestDialog";
import { RequestFormModes } from "../RequestForm";

interface CreateRequestButtonProps {}

const useStyles = makeStyles((theme) => ({
    btnContainer: {
        [theme.breakpoints.down("sm")]: {
            paddingTop: "1%",
            paddingLeft: "1%",
        },
        paddingTop: "5%",
        paddingBottom: "2%",
    },
    btn: {
        backgroundColor: PALETTE.PRIMARY_ALT,
        borderRadius: 8,
    },
    text: {},
}));

const CreateRequestButton: React.FC<CreateRequestButtonProps> = () => {
    const [open, setOpen] = useState(false);
    const styles = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const onMobileView = useMobile();
    const buttonSize = onMobileView ? "small" : undefined;

    return (
        <div>
            <div className={styles.btnContainer}>
                <Button
                    variant="contained"
                    size={buttonSize}
                    color="primary"
                    onClick={() => {
                        setOpen(true);
                    }}
                    className={styles.btn}
                >
                    <span className={styles.text}>Create A New Request</span>
                </Button>
            </div>
            <div>
                <RequestDialog
                    title="Create Request"
                    mode={RequestFormModes.CREATE}
                    open={open}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
};

export default CreateRequestButton;
