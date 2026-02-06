import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";
import Auth from "../../../api/auth";
import {
    CONFIRM_PASSWORD_LABEL,
    SNACK_RESET_PASSWORD,
    SNACK_RESET_PASS_INVALID_TOK,
} from "../../../config/constants";
import FrontendRoutes from "../../../config/frontendRoutes";
import { statusCodes } from "../../../config/statusCodes";
import PasswordInput from "../../../ui/Form/PasswordInput";
import { resetPasswordValidationSchema } from "./validationSchema";

interface ResetPasswordFormProps {
    token: string;
}

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

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const resetPassword = async (password: string) => {
        await Auth.resetPassword(password, token).then((res) => {
            if (res.status === statusCodes.OK) {
                enqueueSnackbar(SNACK_RESET_PASSWORD, { variant: "success" });
                history.push(FrontendRoutes.LOGIN_ROUTE);
            } else if (res.status === statusCodes.UNAUTHORIZED) {
                enqueueSnackbar(SNACK_RESET_PASS_INVALID_TOK, {
                    variant: "error",
                });
            }
        });
    };

    const handleSubmit = async (values: FormikValues) => {
        return resetPassword(values.password);
    };

    return (
        <Formik
            initialValues={{
                password: "",
                confirmation: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={resetPasswordValidationSchema()}
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
                                required
                                value={values.password}
                                errors={errors}
                                touched={touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                extraProps={{ type: "password" }}
                            />
                            <PasswordInput
                                required
                                label={CONFIRM_PASSWORD_LABEL}
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

export default ResetPasswordForm;
