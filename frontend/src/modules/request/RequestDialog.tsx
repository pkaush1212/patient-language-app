import React, { useRef } from "react";
import RequestForm, { RequestFormModes } from "./RequestForm";
import { FormikValues } from "formik";
import DialogWithContent from "../../shared/components/DialogWithContent";

interface RequestDialogProps {
    title: string;
    mode: RequestFormModes;
    open: boolean;
    handleClose: () => void;
}

const RequestDialog: React.FC<RequestDialogProps> = ({
    title,
    mode,
    open,
    handleClose,
}) => {
    const formRef = useRef<FormikValues>(null);

    const handleSubmit = async () => {
        if (formRef?.current) {
            formRef.current.handleSubmit();
        }
    };

    return (
        <DialogWithContent
            open={open}
            title={title}
            onClose={handleClose}
            onSubmit={handleSubmit}
        >
            <RequestForm mode={mode} formRef={formRef} />
        </DialogWithContent>
    );
};

export default RequestDialog;
