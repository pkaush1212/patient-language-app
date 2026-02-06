import React, { useContext, useState } from "react";
import {
    UserInfo,
    UserInfoContext,
} from "../../shared/contexts/UserContextProvider";
import { useSnackbar } from "notistack";
import {
    FORGOT_PASSWORD_LABEL,
    SNACK_SIGN_IN_SUCCESS,
    UserTypes,
} from "../../config/constants";
import Auth from "../../api/auth";
import ErrorResponse from "../../config/types/errorResponse";
import { useHistory, useLocation } from "react-router";
import FrontendRoutes from "../../config/frontendRoutes";
import { IAuthResponse } from "../../config/types/APICustomResponse";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import { Formik, Form, FormikValues, FormikProps } from "formik";
import getValidationSchema from "./validationSchema";
import { mapAuthResponseToUserInfo } from "../../utils/authUtils";
import EmailInput from "../../ui/Form/EmailInput";
import PasswordInput from "../../ui/Form/PasswordInput";
import { LinkDuo } from "../../ui/Elements/LinkDuo";
import SignUpLink from "./SignUpLink";
import { getParameterFromQueryString } from "../../utils/functions";

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
        },
        submitBtn: {
            paddingTop: "5%",
            paddingBottom: "2%",
        },
    })
);

interface LoginFormProps {
    userType: UserTypes;
}

export const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
    // Access to router history to redirect user
    const history = useHistory();
    const location = useLocation();

    // setUserInfo context hook to set the logged in user upon success
    const { setUserInfo } = useContext(UserInfoContext);

    const { enqueueSnackbar } = useSnackbar();

    const styles = useStyles();

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const loginUser = async (email, password) => {
        await Auth.login(email, password, userType)
            .then((res) => {
                const response: IAuthResponse = res.data;
                const userInfo: UserInfo = mapAuthResponseToUserInfo(response);
                setUserInfo(userInfo);

                enqueueSnackbar(SNACK_SIGN_IN_SUCCESS, {
                    variant: "success",
                    autoHideDuration: 2000,
                });
                if (userInfo.isVerified) {
                    // Check if redirect link in query parameters.
                    const redirectLink = getParameterFromQueryString("redir_to", location.search);

                    if (redirectLink) {
                        history.replace({ pathname: redirectLink });
                    } else {
                        history.push(FrontendRoutes.DASHBOARD_ROUTE);
                    }
                } else {
                    history.push(FrontendRoutes.PENDING_VERIFICATION_ROUTE);
                }
            })
            .catch((error: ErrorResponse) => {
                enqueueSnackbar(error.message, {
                    variant: "error",
                    preventDuplicate: true,
                });
            });
    };

    const handleSubmit = async (values: FormikValues, { resetForm }) => {
        setSubmitting(true);
        await loginUser(values.email, values.password);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
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
                } = props;
                return (
                    <Form>
                        <div className={styles.form}>
                            <EmailInput
                                value={values.email}
                                errors={errors}
                                touched={touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                extraProps={{}}
                            />

                            <PasswordInput
                                value={values.password}
                                errors={errors}
                                touched={touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                extraProps={{ type: "password" }}
                            />
                            <LinkDuo
                                to={FrontendRoutes.FORGOT_PASS_ROUTE}
                                style={{ alignSelf: "flex-end" }}
                            >
                                {FORGOT_PASSWORD_LABEL}
                            </LinkDuo>
                        </div>

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
                        <SignUpLink />
                    </Form>
                );
            }}
        </Formik>
    );
};
