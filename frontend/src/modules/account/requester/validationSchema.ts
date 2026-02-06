import { object } from "yup";
import {
    emailValidation as email,
    passwordMinLength4Validation as password,
    firstNameValidation as firstName,
    lastNameValidation as lastName,
    phoneNumberValidation as phoneNumber,
} from "../../../utils/validators";

const getValidationSchema = () => {
    return object().shape({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        // dateOfTraining,
    });
};

export default getValidationSchema;
