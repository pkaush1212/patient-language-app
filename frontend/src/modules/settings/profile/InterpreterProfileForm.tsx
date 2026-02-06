import { Formik, FormikProps, Field, FormikValues } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import Interpreter from "../../../api/interpreter";
import {
    FIRSTNAME_LABEL,
    LASTNAME_LABEL,
    LANGUAGES_SPOKEN_LABEL,
    FIELD_OF_STUDY_LABEL,
    DATE_OF_TRAINING_LABEL,
    SNACK_UPDATED_PROFILE_SUCCESS,
} from "../../../config/constants";
import { LANGUAGE_OPTIONS } from "../../../config/languages";
import IInterpreter from "../../../config/types/entities/IInterpreter";
import ErrorResponse from "../../../config/types/errorResponse";
import {
    UserInfo,
    UserInfoContext,
} from "../../../shared/contexts/UserContextProvider";
import FormikDatePicker from "../../../ui/Form/FormikDatePicker";
import FormikRoundedTextField from "../../../ui/Form/FormikRoundedTextField";
import StyledSelectWithLabel from "../../../ui/Form/StyledSelectWithLabel";
import {
    cleanAllEmptyOrNullFieldsFromObject,
    toTitleCase,
} from "../../../utils/functions";
import ProfileSettingsForm from "./ProfileSettingsForm";

interface InterpreterProfileFormProps {}

const InterpreterProfileForm: React.FC<InterpreterProfileFormProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [self, setSelf] = useState<IInterpreter | null>(null);

    const fetchInterpreter = async (
        userInfo: UserInfo
    ): Promise<IInterpreter | null> => {
        return new Promise((resolve, reject) => {
            Interpreter.getById(userInfo!._id, userInfo!.accessToken)
                .then((res) => {
                    const interpreter: IInterpreter = res.data;
                    resolve(interpreter);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    useEffect(() => {
        const updateForm = async () => {
            const interpreter = await fetchInterpreter(userInfo!);
            setSelf(interpreter);
        };
        updateForm();
    }, [userInfo]);

    const { enqueueSnackbar } = useSnackbar();

    const updateInterpreter = async (interpreter: IInterpreter) => {
        await Interpreter.update(
            userInfo!._id,
            interpreter,
            userInfo!.accessToken
        )
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
        const interpreter: IInterpreter = mapFormikValuesToInterpreter(values);
        updateInterpreter(interpreter);
    };

    const mapFormikValuesToInterpreter = (
        values: FormikValues
    ): IInterpreter => {
        const mapping = {
            email: self?.email,
            firstName: values.firstName,
            lastName: values.lastName,
            languagesSpoken: values.languagesSpoken?.map((language) =>
                language.value.toUpperCase()
            ),
            dateOfTraining: values.dateOfTraining,
            fieldOfStudy: values.fieldOfStudy,
        };

        cleanAllEmptyOrNullFieldsFromObject(mapping);

        return mapping as IInterpreter;
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstName: self?.firstName,
                lastName: self?.lastName,
                languagesSpoken: self?.languagesSpoken?.map((language) => {
                    const languageTitled = toTitleCase(language);
                    return {
                        label: languageTitled,
                        value: languageTitled,
                    };
                }),
                dateOfTraining: self?.dateOfTraining
                    ? new Date(self?.dateOfTraining)
                          ?.toISOString()
                          .split("T")[0]
                    : undefined,
                fieldOfStudy: self?.fieldOfStudy,
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

                                <Field
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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

export default InterpreterProfileForm;
