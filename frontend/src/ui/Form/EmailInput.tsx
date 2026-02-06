import { TextFieldProps } from "@material-ui/core";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { EMAIL_LABEL } from "../../config/constants";
import RoundedTextField from "./RoundedTextField";

interface EmailInputProps {
    value: string;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    onChange: any;
    onBlur: any;
    extraProps?: TextFieldProps;
    required?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
    errors,
    touched,
    value,
    onChange,
    onBlur,
    extraProps,
    required,
}) => {
    const textFieldProps = {
        name: "email",
        required,
        helperText: errors.email && touched.email ? errors.email : "",
        error: errors.email && touched.email ? true : false,
        value,
        onChange,
        onBlur,
        ...extraProps,
    };

    return (
        <RoundedTextField label={EMAIL_LABEL} textFieldProps={textFieldProps} />
    );
};

export default EmailInput;
