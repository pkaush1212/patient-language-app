import { TextFieldProps } from "@material-ui/core";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { EMAIL_LABEL, PHONENUMBER_LABEL } from "../../config/constants";
import RoundedTextField from "./RoundedTextField";

interface PhoneNumberInputProps {
    value: string;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    onChange: any;
    onBlur: any;
    extraProps?: TextFieldProps;
    required: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
    errors,
    touched,
    value,
    onChange,
    onBlur,
    extraProps,
    required,
}) => {
    const textFieldProps = {
        name: "phoneNumber",
        helperText:
            errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : "",
        error: errors.phoneNumber && touched.phoneNumber ? true : false,
        value,
        onChange,
        onBlur,
        ...extraProps,
        required,
        inputProps: { maxLength: 10 },
    };

    return (
        <RoundedTextField
            label={PHONENUMBER_LABEL}
            textFieldProps={textFieldProps}
        />
    );
};

export default PhoneNumberInput;
