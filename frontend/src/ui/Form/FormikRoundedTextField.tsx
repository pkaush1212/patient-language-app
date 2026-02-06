import React from "react";
import RoundedTextField from "./RoundedTextField";

interface FormikRoundedTextFieldProps {
    name: string;
    label: string;
    onChange;
    onBlur;
    props;
    required?: boolean;
    extraTextFieldProps?;
}

const FormikRoundedTextField: React.FC<FormikRoundedTextFieldProps> = ({
    label,
    name,
    props,
    onChange,
    onBlur,
    required,
    extraTextFieldProps,
}) => {
    const { values, errors, touched } = props;

    return (
        <RoundedTextField
            label={label}
            required={required}
            textFieldProps={{
                name,
                helperText: errors[name] && touched[name] ? errors[name] : "",
                error: errors[name] && touched[name] ? true : false,
                value: values[name],
                onChange,
                onBlur,

                ...extraTextFieldProps,
            }}
        />
    );
};

export default FormikRoundedTextField;
