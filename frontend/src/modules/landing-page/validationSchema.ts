import { object } from "yup";
import {
    emailValidation as email,
    passwordMinLength4Validation as password,
} from "../../utils/validators";

const getValidationSchema = () => {
    return object().shape({
        email,
        password,
    });
};

export default getValidationSchema;
