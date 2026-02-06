import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { roundTextFieldStylesHook } from "@mui-treasury/styles/textField/round";

interface RoundedTextFieldProps {
    label: string;
    textFieldProps?: TextFieldProps;
    extraInputProps?;
    required?: boolean;
}

const RoundedTextField: React.FC<RoundedTextFieldProps> = ({
    label,
    textFieldProps,
    extraInputProps,
    required,
}) => {
    const inputBaseStyles = roundTextFieldStylesHook.useInputBase();
    const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();
    const helperTextStyles = roundTextFieldStylesHook.useHelperText();

    return (
        <TextField
            style={{ width: "100%" }}
            label={label}
            margin={"normal"}
            InputLabelProps={{
                shrink: true,
                classes: inputLabelStyles,
                required,
            }}
            InputProps={{
                classes: {
                    ...inputBaseStyles,
                    adornedEnd: null,
                    adornedStart: null,
                },
                disableUnderline: true,
                ...extraInputProps,
            }}
            FormHelperTextProps={{ classes: helperTextStyles }}
            {...textFieldProps}
        ></TextField>
    );
};

export default RoundedTextField;
