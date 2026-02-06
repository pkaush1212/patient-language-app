import React, { useState } from "react";
import { Form } from "formik";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface AccountFormProps {
    isSubmitting: boolean;
    isValid: boolean;
    page1: React.ReactFragment;
    page2: React.ReactFragment;
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
    termsAndConds: {
        alignSelf: "flex-end",
        fontSize: 12,
    },
}));

const AccountForm: React.FC<AccountFormProps> = ({
    isSubmitting,
    isValid,
    page1,
    page2,
}) => {
    const styles = useStyles();
    const [page, setPage] = useState(0);

    return (
        <Form>
            <div className={styles.form}>
                {page === 0 ? (
                    <React.Fragment>
                        {page1}

                        <div className={styles.submitBtn}>
                            <span>1/2 &nbsp;</span>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setPage(1)}
                                disabled={!isValid}
                            >
                                Next
                            </Button>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div>
                            <IconButton
                                aria-label="back"
                                color="primary"
                                onClick={() => setPage(0)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        {page2}

                        <div className={styles.submitBtn}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Get Started
                            </Button>
                        </div>
                        <span className={styles.termsAndConds}>
                            By joining you agree to the <b>Terms</b> and{" "}
                            <b>Privacy Policy</b>
                        </span>
                    </React.Fragment>
                )}
            </div>
        </Form>
    );
};

export default AccountForm;
