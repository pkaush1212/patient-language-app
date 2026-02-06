import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Form } from "formik";

export interface ProfileSettingsFormProps {
    formContent: React.ReactFragment;
    isSubmitting: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        overflow: "auto",
    },
    formContainer: {},
    submitBtn: {
        paddingTop: "5%",
        paddingBottom: "2%",
    },
}));

const ProfileSettingsForm: React.FC<ProfileSettingsFormProps> = ({
    formContent,
    isSubmitting,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Form>
                <div className={styles.formContainer}>
                    {formContent}
                    <div className={styles.submitBtn}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Update Profile
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ProfileSettingsForm;
