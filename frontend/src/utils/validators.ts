import { string, ref } from "yup";

export const emailValidation = string()
    .required("Required")
    .email("Must be a valid email");

export const passwordMinLength4Validation = string()
    .min(4, "Must be at least 4 characters")
    .required("Required");

export const passwordConfirmationMustMatch = string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
        return this.parent.password === value;
    }
);

export const firstNameValidation = string()
    .required("Required")
    .matches(/^[a-z ,.'-]+$/i, "Only alphabets are allowed for this field");

export const lastNameValidation = string()
    .required("Required")
    .matches(/^[a-z ,.'-]+$/i, "Only alphabets are allowed for this field");

export const phoneNumberValidation = string()
    .required("Required")
    .matches(
        /^\d{10}$/,
        "Please enter a 10 digit phone number with no special characters"
    )
    .min(10, "Please enter a 10 digit number");
