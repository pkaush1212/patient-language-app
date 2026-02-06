import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { SIGNUP_TITLE, UserTypes } from "../../config/constants";
import { CreateAccount } from "../../modules/account/CreateAccount";
import LeftArtWithContentRight from "../../modules/layouts/LeftArtWithContentRight";
import UserTypePicker from "../../shared/components/UserTypePicker";
import logo from "../../assets/logo.png";
import vector from "../../assets/onboarding_vector.png";
import Helmet from "react-helmet";

interface CreateAccountPageProps {}

const useStyles = makeStyles((theme) => ({
    logo: {
        marginLeft: "35%",
        marginBottom: "10%",
    },
    userPicker: {
        alignSelf: "center",
    },
}));

const CreateAccountPage: React.FC<CreateAccountPageProps> = () => {
    const styles = useStyles();
    const [userType, setUserType] = useState<UserTypes>(UserTypes.REQUESTER);

    return (
        <React.Fragment>
            <Helmet>
                <title>{SIGNUP_TITLE}</title>
            </Helmet>
            <LeftArtWithContentRight
                imgSrc={vector}
                formContainerHeaderContent={
                    <div className={styles.userPicker}>
                        <img
                            alt=""
                            src={logo}
                            height="100px"
                            className={styles.logo}
                        />
                        <UserTypePicker setUserType={setUserType} />
                    </div>
                }
                formContainer={
                    <div>
                        <CreateAccount userType={userType} />
                    </div>
                }
            />
        </React.Fragment>
    );
};

export default CreateAccountPage;
