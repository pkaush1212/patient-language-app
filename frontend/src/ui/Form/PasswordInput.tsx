import { IconButton, InputAdornment, TextFieldProps } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FormikErrors, FormikTouched } from "formik";
import React, { useState } from "react";
import { PASSWORD_LABEL } from "../../config/constants";
import RoundedTextField from "./RoundedTextField";

interface PasswordInputProps {
    name?: string;
    label?: string;
    value: string;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    onChange: any;
    onBlur: any;
    extraProps?: TextFieldProps;
    required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    name = "password",
    label = PASSWORD_LABEL,
    errors,
    touched,
    value,
    onChange,
    onBlur,
    extraProps,
    required,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const textFieldProps = {
        name,
        helperText: errors[name] && touched[name] ? errors[name] : "",
        error: errors[name] && touched[name] ? true : false,
        value,
        onChange,
        onBlur,
        ...extraProps,
        required,
    };

    return (
        <RoundedTextField
            label={label}
            textFieldProps={{
                ...textFieldProps,
                type: showPassword ? "text" : "password",
            }}
            extraInputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
