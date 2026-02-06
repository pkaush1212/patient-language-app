import { Button, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React, { useState } from "react";
import Auth from "../../../api/auth";
import ErrorResponse from "../../../config/types/errorResponse";
import EmailInput from "../../../ui/Form/EmailInput";
import { forgotPasswordValidationSchema } from "./validationSchema";

interface ForgotPasswordProps {}

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
    root: {
        display: "flex",
        flexDirection: "column",
    },
    img: {
        marginLeft: "25%",
        marginBottom: "10%",
    },
    text: {
        wordSpacing: 5,
    },
    textWrapper: {},
}));

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
    const [submitted, setSubmitted] = useState(false);
    const styles = useStyles();

    const forgotPassword = async (email: string) => {
        Auth.forgotPassword(email)
            .then(() => {
                setSubmitted(true);
            })
            .catch((error: ErrorResponse) => {
                console.error(error);
            });
    };

    const handleSubmit = async (values: FormikValues) => {
        setSubmitted(true);
        return forgotPassword(values.email);
    };

    return (
        <div className={styles.root}>
            {!submitted ? (
                <div>
                    <Typography>
                        <h2>Forgot Password</h2>
                        <Typography>
                            Enter your email and we will send you a link to
                            reset your password
                        </Typography>
                    </Typography>

                    <Formik
                        initialValues={{
                            email: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={forgotPasswordValidationSchema()}
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
                                        <EmailInput
                                            required
                                            value={values.email}
                                            errors={errors}
                                            touched={touched}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            extraProps={{}}
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
                </div>
            ) : (
                <div className={styles.textWrapper}>
                    <Typography gutterBottom>
                        We've sent you a link to reset your password. Check your
                        inbox and follow the instructions there.
                    </Typography>
                </div>
            )}
        </div>
    );
};
