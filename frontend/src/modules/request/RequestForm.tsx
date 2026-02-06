import { makeStyles } from "@material-ui/core";
import { Formik, FormikProps, Form, Field, FormikValues } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Request from "../../api/request";
import { APPT_MODE_OPTIONS } from "../../config/appointmentMode";
import { CLINICAL_SETTING_OPTIONS } from "../../config/clinicalSetting";
import {
    CLINICAL_SETTING_LABEL,
    DATE_OF_REQUEST_LABEL,
    DEPARTMENT_FLOOR_LABEL,
    DIALECT_LABEL,
    INTERPRETATION_MODE_LABEL,
    LANGUAGES_SPOKEN_LABEL,
    PATIENT_GENDER_LABEL,
    RequestState,
    REQUEST_NOTES_LABEL,
    SNACK_REQ_CREATED_SUCCESS,
    SNACK_REQ_UPDATED_SUCCESS,
} from "../../config/constants";
import { LANGUAGE_OPTIONS } from "../../config/languages";
import IRequest from "../../config/types/entities/IRequest";
import ErrorResponse from "../../config/types/errorResponse";
import { RequestDetailsContext } from "../../shared/contexts/RequestDetailsContextProvider";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import FormikRoundedTextField from "../../ui/Form/FormikRoundedTextField";
import RoundedDateTimePicker from "../../ui/Form/RoundedDateTimePicker";
import StyledSelectWithLabel from "../../ui/Form/StyledSelectWithLabel";
import {
    cleanAllEmptyOrNullFieldsFromObject,
    toTitleCase,
} from "../../utils/functions";

export enum RequestFormModes {
    CREATE,
    EDIT,
}

interface RequestFormProps {
    mode: RequestFormModes;
    formRef: any;
}

const useStyles = makeStyles(() => ({
    container: {
        overflowX: "hidden",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
    },
}));

const RequestForm: React.FC<RequestFormProps> = ({ mode, formRef }) => {
    const { userInfo } = useContext(UserInfoContext);
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const { requestDetails } = useContext(RequestDetailsContext);

    useEffect(() => {
        if (mode === RequestFormModes.EDIT && requestDetails.request) {
            const values = mapRequestToFormikValues(requestDetails.request);
            (formRef as React.RefObject<FormikValues>).current?.setValues(
                values
            );
        }
    }, [mode]);

    const createRequest = async (request: IRequest) => {
        return Request.create(request, userInfo!.accessToken)
            .then((res) => {
                window.location.reload();
                enqueueSnackbar(SNACK_REQ_CREATED_SUCCESS, {
                    variant: "success",
                });
                return true;
            })
            .catch((error: ErrorResponse) => {
                enqueueSnackbar(error.message, { variant: "error" });
                return false;
            });
    };

    const updateRequest = async (requestId: string, request: IRequest) => {
        return Request.update(requestId, request, userInfo!.accessToken)
            .then((res) => {
                window.location.reload();
                enqueueSnackbar(SNACK_REQ_UPDATED_SUCCESS, {
                    variant: "success",
                });
                return true;
            })
            .catch((error: ErrorResponse) => {
                enqueueSnackbar(error.message, { variant: "error" });
                return false;
            });
    };

    const handleSubmit = async (values: FormikValues) => {
        const request: IRequest = mapFormikValuesToRequest(values);

        switch (mode) {
            case RequestFormModes.CREATE:
                return createRequest(request);
            case RequestFormModes.EDIT:
                if (requestDetails?.request?._id) {
                    return updateRequest(requestDetails.request._id, request);
                }
        }
    };

    const mapFormikValuesToRequest = (values: FormikValues): IRequest => {
        const mapping = {
            requester: userInfo?._id,
            date: values.date,
            state: RequestState.PENDING,
            interpretationMode: values.interpretationMode,
            dialect: values.dialect,
            languageRequired: values.languageRequired?.map((language) =>
                language.value.toUpperCase()
            ),
            patientGender: values.patientGender,
            department: values.department,
            clinicalSetting: values.clinicalSetting,
            requestNotes: values.requestNotes,
        };

        cleanAllEmptyOrNullFieldsFromObject(mapping);

        return mapping as IRequest;
    };

    const mapRequestToFormikValues = (request: IRequest): FormikValues => {
        return {
            date: new Date(request.date),
            interpretationMode: request.interpretationMode,
            dialect: request.dialect,
            languageRequired: request.languageRequired?.map((language) => {
                const languageTitled = toTitleCase(language);
                return {
                    label: languageTitled,
                    value: languageTitled,
                };
            }),
            patientGender: request.patientGender,
            department: request.department,
            clinicalSetting: request.clinicalSetting,
            requestNotes: request.requestNotes,
        };
    };

    return (
        <div className={styles.container}>
            <Formik
                innerRef={formRef}
                initialValues={{
                    date: new Date(Date.now()),
                    interpretationMode: "",
                    dialect: "",
                    languageRequired: [],
                    patientGender: "",
                    department: "",
                    clinicalSetting: "",
                    requestNotes: "",
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
                        setFieldValue,
                        isSubmitting,
                        isValid,
                    } = props;
                    return (
                        <Form>
                            <div className={styles.form}>
                                <RoundedDateTimePicker
                                    required={true}
                                    label={DATE_OF_REQUEST_LABEL}
                                    startDate={values.date}
                                    setStartDate={(date) => {
                                        setFieldValue("date", date);
                                    }}
                                    extraProps={
                                        {
                                            minDate : new Date(Date.now())
                                        }
                                    }
                                />

                                <Field
                                    required={true}
                                    name="interpretationMode"
                                    label={INTERPRETATION_MODE_LABEL}
                                    component={StyledSelectWithLabel}
                                    options={{
                                        multiple: false,
                                        selections: APPT_MODE_OPTIONS,
                                    }}
                                />

                                <Field
                                    required={true}
                                    name="clinicalSetting"
                                    label={CLINICAL_SETTING_LABEL}
                                    component={StyledSelectWithLabel}
                                    options={{
                                        multiple: false,
                                        selections: CLINICAL_SETTING_OPTIONS,
                                    }}
                                />

                                <Field
                                    required={true}
                                    name="languageRequired"
                                    label={LANGUAGES_SPOKEN_LABEL}
                                    component={StyledSelectWithLabel}
                                    options={{
                                        multiple: true,
                                        selections: LANGUAGE_OPTIONS,
                                    }}
                                />

                                <FormikRoundedTextField
                                    required={true}
                                    label={DEPARTMENT_FLOOR_LABEL}
                                    name="department"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraTextFieldProps={{
                                        placeholder: "JH Dept 12",
                                    }}
                                />

                                <FormikRoundedTextField
                                    label={DIALECT_LABEL}
                                    name="dialect"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <FormikRoundedTextField
                                    label={PATIENT_GENDER_LABEL}
                                    name="patientGender"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <FormikRoundedTextField
                                    label={REQUEST_NOTES_LABEL}
                                    name="requestNotes"
                                    props={{ errors, values, touched }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraTextFieldProps={{
                                        multiline: true,
                                        rows: 2,
                                    }}
                                />
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default RequestForm;
