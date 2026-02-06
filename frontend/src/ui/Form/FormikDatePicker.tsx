import { FieldProps } from "formik";
import React from "react";
import RoundedTextField from "./RoundedTextField";

interface FormikDatePickerProps {
    label: string;
    required?: boolean;
    extraProps?;
    type?: string;
}

const FormikDatePicker: React.FC<FormikDatePickerProps & FieldProps> = ({
    label,
    required,
    form,
    field,
    extraProps,
    type = "date",
}) => {
    const name = field.name;

    const textFieldProps = {
        name,
        required: { required },
        helperText:
            form.errors[name] && form.errors[name] ? form.errors[name] : "",
        error: form.errors[name] && form.touched[name] ? true : false,
        value: field.value,
        onChange: field.onChange,
        onBlur: field.onBlur,
        ...extraProps,
    };

    return (
        <RoundedTextField
            label={label}
            textFieldProps={textFieldProps}
            extraInputProps={{ type }}
        />
    );
};

export default FormikDatePicker;
