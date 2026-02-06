import { object } from "yup";
import {
    emailValidation as email,
    passwordMinLength4Validation as password,
    passwordConfirmationMustMatch as confirmation,
} from "../../../utils/validators";

const forgotPasswordValidationSchema = () => {
    return object().shape({
        email,
    });
};

const resetPasswordValidationSchema = () => {
    return object().shape({
        password,
        confirmation,
    });
};

export { forgotPasswordValidationSchema, resetPasswordValidationSchema };
