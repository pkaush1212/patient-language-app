import { Formik, FormikProps, Field, FormikValues } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Requester from "../../../api/requester";
import { CLINICAL_SETTING_OPTIONS } from "../../../config/clinicalSetting";
import {
    FIRSTNAME_LABEL,
    LASTNAME_LABEL,
    CLINICAL_SETTING_LABEL,
    DEPARTMENT_CLINIC_LABEL,
    HOSPITAL_CLINIC_LABEL,
    POSITION_LABEL,
    SNACK_UPDATED_PROFILE_SUCCESS,
} from "../../../config/constants";
import { POSITION_OPTIONS } from "../../../config/positions";
import IRequester from "../../../config/types/entities/IRequester";
import ErrorResponse from "../../../config/types/errorResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../../shared/contexts/UserContextProvider";
import FormikRoundedTextField from "../../../ui/Form/FormikRoundedTextField";
import StyledSelectWithLabel from "../../../ui/Form/StyledSelectWithLabel";
import { cleanAllEmptyOrNullFieldsFromObject } from "../../../utils/functions";
import getValidationSchema from "../../landing-page/validationSchema";
import ProfileSettingsForm from "./ProfileSettingsForm";

interface RequesterProfileFormProps {}

const RequesterProfileForm: React.FC<RequesterProfileFormProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [self, setSelf] = useState<IRequester | null>(null);

    const fetchRequester = async (
        userInfo: UserInfo
    ): Promise<IRequester | null> => {
        return new Promise((resolve, reject) => {
            Requester.getById(userInfo!._id, userInfo!.accessToken)
                .then((res) => {
                    const requester: IRequester = res.data;
                    resolve(requester);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    useEffect(() => {
        const updateForm = async () => {
            const requester = await fetchRequester(userInfo!);
            setSelf(requester);
        };
        updateForm();
    }, [userInfo]);

    const { enqueueSnackbar } = useSnackbar();

    const updateRequester = async (requester: IRequester) => {
        await Requester.update(userInfo!._id, requester, userInfo!.accessToken)
            .then((res) => {
                enqueueSnackbar(SNACK_UPDATED_PROFILE_SUCCESS, {
                    variant: "success",
                });
                window.location.reload();
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
        return updateRequester(requester);
    };

    const mapFormikValuesToRequester = (values: FormikValues): IRequester => {
        const mapping = {
            email: self?.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: self?.phoneNumber,
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
            enableReinitialize={true}
            initialValues={{
                firstName: self?.firstName,
                lastName: self?.lastName,
                hospital: self?.hospital,
                department: self?.department,
                position: self?.position,
                clinicalSetting: self?.clinicalSetting,
            }}
            onSubmit={handleSubmit}
        >
            {(props: FormikProps<any>) => {
                const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                } = props;
                return (
                    <ProfileSettingsForm
                        formContent={
                            <React.Fragment>
                                <FormikRoundedTextField
                                    label={FIRSTNAME_LABEL}
                                    name="firstName"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <FormikRoundedTextField
                                    label={LASTNAME_LABEL}
                                    name="lastName"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                        isSubmitting={isSubmitting}
                    />
                );
            }}
        </Formik>
    );
};

export default RequesterProfileForm;
