import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FrontendRoutes from "../../../config/frontendRoutes";
import { IAuthResponse } from "../../../config/types/APICustomResponse";
import IRequester from "../../../config/types/entities/IRequester";
import ErrorResponse from "../../../config/types/errorResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../../shared/contexts/UserContextProvider";
import { mapAuthResponseToUserInfo } from "../../../utils/authUtils";
import { Formik, FormikValues, FormikProps, Field } from "formik";

import getValidationSchema from "./validationSchema";
import {
    CLINICAL_SETTING_LABEL,
    DEPARTMENT_CLINIC_LABEL,
    FIRSTNAME_LABEL,
    HOSPITAL_CLINIC_LABEL,
    LASTNAME_LABEL,
    POSITION_LABEL,
} from "../../../config/constants";
import { VerifyAccountType } from "../../auth/VerifyAccount";
import { useSnackbar } from "notistack";
import Requester from "../../../api/requester";
import FormikRoundedTextField from "../../../ui/Form/FormikRoundedTextField";
import EmailInput from "../../../ui/Form/EmailInput";
import PasswordInput from "../../../ui/Form/PasswordInput";
import PhoneNumberInput from "../../../ui/Form/PhoneNumberInput";
import { cleanAllEmptyOrNullFieldsFromObject } from "../../../utils/functions";
import AccountForm from "../AccountForm";
import { CLINICAL_SETTING_OPTIONS } from "../../../config/clinicalSetting";
import StyledSelectWithLabel from "../../../ui/Form/StyledSelectWithLabel";
import { POSITION_OPTIONS } from "../../../config/positions";

interface RequesterAccountFormProps {}

export const RequesterAccountForm: React.FC<RequesterAccountFormProps> = () => {
    // to navigate to dashboard with successful sign up
    const history = useHistory();

    // set the user info in context once sign up done
    const { setUserInfo } = useContext(UserInfoContext);

    const { enqueueSnackbar } = useSnackbar();

    const createRequester = async (requester: IRequester) => {
        await Requester.create(requester)
            .then((res) => {
                const response: IAuthResponse = res.data;
                const userInfo: UserInfo = mapAuthResponseToUserInfo(response);
                setUserInfo(userInfo);

                history.push(
                    FrontendRoutes.PENDING_VERIFICATION_ROUTE,
                    VerifyAccountType.PENDING_EMAIL_VERIFICATION
                );
            })
            .catch((error: ErrorResponse) => {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    autoHideDuration: 4000,
                });
            });
    };

    const handleSubmit = async (values: FormikValues) => {
        const requester: IRequester = mapFormikValuesToRequester(values);
        return createRequester(requester);
    };

    const mapFormikValuesToRequester = (values: FormikValues): IRequester => {
        const mapping = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            hospital: values.hospital,
            department: values.department,
            position: values.position,
            clinicalSetting: values.clinicalSetting,
        };

        cleanAllEmptyOrNullFieldsFromObject(mapping);
        return mapping as IRequester;
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                hospital: "",
                department: "",
                position: "",
                clinicalSetting: "",
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
                                <PhoneNumberInput
                                    required
                                    value={values.phoneNumber}
                                    errors={errors}
                                    touched={touched}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraProps={{}}
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
                                    extraProps={{}}
                                />
                            </React.Fragment>
                        }
                        page2={
                            <React.Fragment>
                                <FormikRoundedTextField
                                    label={HOSPITAL_CLINIC_LABEL}
                                    name="hospital"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormikRoundedTextField
                                    label={DEPARTMENT_CLINIC_LABEL}
                                    name="department"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Field
                                    name="position"
                                    label={POSITION_LABEL}
                                    component={StyledSelectWithLabel}
                                    options={{
                                        multiple: false,
                                        selections: POSITION_OPTIONS,
                                    }}
                                />
                                <Field
                                    name="clinicalSetting"
                                    label={CLINICAL_SETTING_LABEL}
                                    component={StyledSelectWithLabel}
                                    options={{
                                        multiple: false,
                                        selections: CLINICAL_SETTING_OPTIONS,
                                    }}
                                />
                            </React.Fragment>
                        }
                    />
                );
            }}
        </Formik>
    );
};
