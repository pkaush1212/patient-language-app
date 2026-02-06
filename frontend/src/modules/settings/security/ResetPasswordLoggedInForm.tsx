import { makeStyles, Button } from "@material-ui/core";
import { FormikValues, Formik, FormikProps, Form } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import Auth from "../../../api/auth";
import {
    SNACK_RESET_PASSWORD,
    SNACK_RESET_PASSWORD_FAIL,
    CONFIRM_NEW_PASSWORD_LABEL,
    NEW_PASSWORD_LABEL,
    OLD_PASSWORD_LABEL,
} from "../../../config/constants";
import { statusCodes } from "../../../config/statusCodes";
import ErrorResponse from "../../../config/types/errorResponse";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import PasswordInput from "../../../ui/Form/PasswordInput";
import { resetPasswordLoggedInFormValidation } from "./validationSchema";

interface ResetPasswordLoggedInFormProps {}

const useStyles = makeStyles(() => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    submitBtn: {
        paddingTop: "5%",
        paddingBottom: "2%",
        alignSelf: "flex-end",
    },
}));

const ResetPasswordLoggedInForm: React.FC<ResetPasswordLoggedInFormProps> =
    () => {
        const styles = useStyles();
        const { enqueueSnackbar } = useSnackbar();
        const { userInfo } = useContext(UserInfoContext);

        const resetPasswordOldNew = async (
            oldPassword: string,
            newPassword: string,
            userToken: string
        ) => {
            await Auth.resetPasswordOldNew(oldPassword, newPassword, userToken)
                .then((res) => {
                    if (res.status === statusCodes.OK) {
                        enqueueSnackbar(SNACK_RESET_PASSWORD, {
                            variant: "success",
                        });
                        window.location.reload();
                    } else if (res.status === statusCodes.UNAUTHORIZED) {
                        enqueueSnackbar(SNACK_RESET_PASSWORD_FAIL, {
                            variant: "error",
                        });
                    }
                })
                .catch((error: ErrorResponse) => {
                    enqueueSnackbar(error?.message, { variant: "error" });
                });
        };

        const handleSubmit = async (values: FormikValues) => {
            return await resetPasswordOldNew(
                values.oldPassword,
                values.password,
                userInfo!.accessToken
            );
        };

        return (
            <Formik
                initialValues={{
                    oldPassword: "",
                    password: "",
                    confirmation: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={resetPasswordLoggedInFormValidation()}
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
                        <Form>
                            <div className={styles.form}>
                                <PasswordInput
                                    name="oldPassword"
                                    label={OLD_PASSWORD_LABEL}
                                    required
                                    value={values.oldPassword}
                                    errors={errors}
                                    touched={touched}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraProps={{ type: "password" }}
                                />
                                <PasswordInput
                                    required
                                    value={values.password}
                                    label={NEW_PASSWORD_LABEL}
                                    errors={errors}
                                    touched={touched}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraProps={{ type: "password" }}
                                />
                                <PasswordInput
                                    required
                                    label={CONFIRM_NEW_PASSWORD_LABEL}
                                    name="confirmation"
                                    value={values.confirmation}
                                    errors={errors}
                                    touched={touched}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    extraProps={{ type: "password" }}
                                />
                                <div className={styles.submitBtn}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        );
    };

export default ResetPasswordLoggedInForm;
