import { object } from "yup";
import {
    emailValidation as email,
    firstNameValidation as firstName,
    lastNameValidation as lastName,
    passwordMinLength4Validation as password,
} from "../../../utils/validators";

const getValidationSchema = () => {
    return object().shape({
        email,
        password,
        firstName,
        lastName,
        // dateOfTraining,
    });
};

export default getValidationSchema;
