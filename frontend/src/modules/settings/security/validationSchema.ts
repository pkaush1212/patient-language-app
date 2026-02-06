import { object } from "yup";
import {
    passwordMinLength4Validation as oldPassword,
    passwordMinLength4Validation as password,
    passwordConfirmationMustMatch as confirmation,
} from "../../../utils/validators";

const resetPasswordLoggedInFormValidation = () => {
    return object().shape({
        oldPassword,
        password,
        confirmation,
    });
};

export { resetPasswordLoggedInFormValidation };
