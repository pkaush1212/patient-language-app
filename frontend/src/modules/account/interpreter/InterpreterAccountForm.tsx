import { Field, Formik, FormikProps, FormikValues } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Interpreter from "../../../api/interpreter";
import {
    DATE_OF_TRAINING_LABEL,
    FIELD_OF_STUDY_LABEL,
    FIRSTNAME_LABEL,
    LANGUAGES_SPOKEN_LABEL,
    LASTNAME_LABEL,
} from "../../../config/constants";
import FrontendRoutes from "../../../config/frontendRoutes";
import { LANGUAGE_OPTIONS } from "../../../config/languages";
import { IAuthResponse } from "../../../config/types/APICustomResponse";
import IInterpreter from "../../../config/types/entities/IInterpreter";
import ErrorResponse from "../../../config/types/errorResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../../shared/contexts/UserContextProvider";
import EmailInput from "../../../ui/Form/EmailInput";
import FormikDatePicker from "../../../ui/Form/FormikDatePicker";
import FormikRoundedTextField from "../../../ui/Form/FormikRoundedTextField";
import PasswordInput from "../../../ui/Form/PasswordInput";
import StyledSelectWithLabel from "../../../ui/Form/StyledSelectWithLabel";
import { mapAuthResponseToUserInfo } from "../../../utils/authUtils";
import { cleanAllEmptyOrNullFieldsFromObject } from "../../../utils/functions";
import AccountForm from "../AccountForm";
import getValidationSchema from "./validationSchema";

interface InterpreterAccountFormProps {}

export const InterpreterAccountForm: React.FC<InterpreterAccountFormProps> =
    () => {
        // to navigate to dashboard with successful sign up
        const history = useHistory();

        // set the user info in context once sign up done
        const { setUserInfo } = useContext(UserInfoContext);

        const { enqueueSnackbar } = useSnackbar();

        const createInterpreter = async (interpreter: IInterpreter) => {
            await Interpreter.create(interpreter)
                .then((res) => {
                    const response: IAuthResponse = res.data;
                    const userInfo: UserInfo =
                        mapAuthResponseToUserInfo(response);
                    setUserInfo(userInfo);

                    history.push(FrontendRoutes.PENDING_VERIFICATION_ROUTE);
                })
                .catch((error: ErrorResponse) => {
                    enqueueSnackbar(error.message, {
                        variant: "error",
                        autoHideDuration: 4000,
                    });
                });
        };

        const handleSubmit = async (values: FormikValues) => {
            const interpreter: IInterpreter =
                mapFormikValuesToInterpreter(values);
            return createInterpreter(interpreter);
        };

        const mapFormikValuesToInterpreter = (
            values: FormikValues
        ): IInterpreter => {
            const mapping = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                languagesSpoken: values.languagesSpoken?.map((language) =>
                    language.value.toUpperCase()
                ),
                dateOfTraining: values.dateOfTraining, // TODO: optional fields
                fieldOfStudy: values.fieldOfStudy,
            };

            cleanAllEmptyOrNullFieldsFromObject(mapping);

            return mapping as IInterpreter;
        };

        return (
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    languagesSpoken: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
            >
                {(props: FormikProps<any>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                        isValid,
                    } = props;
                    return (
                        <AccountForm
                            isSubmitting={isSubmitting}
                            isValid={isValid}
                            page1={
                                <React.Fragment>
                                    <FormikRoundedTextField
                                        required
                                        label={FIRSTNAME_LABEL}
                                        name="firstName"
                                        props={{ errors, values, touched }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <FormikRoundedTextField
                                        required
                                        label={LASTNAME_LABEL}
                                        name="lastName"
                                        props={{ errors, values, touched }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <EmailInput
                                        required
                                        value={values.email}
                                        errors={errors}
                                        touched={touched}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        extraProps={{}}
                                    />

                                    <PasswordInput
                                        required
                                        value={values.password}
                                        errors={errors}
                                        touched={touched}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        extraProps={{ type: "password" }}
                                    />
                                </React.Fragment>
                            }
                            page2={
                                <React.Fragment>
                                    <Field
                                        required={true}
                                        name="languagesSpoken"
                                        label={LANGUAGES_SPOKEN_LABEL}
                                        component={StyledSelectWithLabel}
                                        options={{
                                            multiple: true,
                                            selections: LANGUAGE_OPTIONS,
                                        }}
                                    />

                                    <FormikRoundedTextField
                                        label={FIELD_OF_STUDY_LABEL}
                                        name="fieldOfStudy"
                                        props={{ errors, values, touched }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    <Field
                                        name="dateOfTraining"
                                        label={DATE_OF_TRAINING_LABEL}
                                        component={FormikDatePicker}
                                    />
                                </React.Fragment>
                            }
                        />
                    );
                }}
            </Formik>
        );
    };
