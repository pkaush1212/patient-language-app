import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { LOGIN_TITLE, UserTypes } from "../config/constants";
import { LoginForm } from "../modules/landing-page/LoginForm";
import LeftArtWithContentRight from "../modules/layouts/LeftArtWithContentRight";
import UserTypePicker from "../shared/components/UserTypePicker";
import logo from "../assets/logo.png";
import vector from "../assets/onboarding_vector.png";
import Helmet from "react-helmet";
import { useLocation } from "react-router-dom";

interface LoginPageProps {}

const useStyles = makeStyles((theme) => ({
    logo: {
        marginLeft: "35%",
        marginBottom: "10%",
    },
    userPicker: {
        alignSelf: "center",
    },
}));

const LoginPage: React.FC<LoginPageProps> = () => {
    const styles = useStyles();
    const [userType, setUserType] = useState<UserTypes>(UserTypes.REQUESTER);

    return (
        <React.Fragment>
            <Helmet>
                <title>{LOGIN_TITLE}</title>
            </Helmet>
            <LeftArtWithContentRight
                imgSrc={vector}
                formContainerHeaderContent={
                    <div className={styles.userPicker}>
                        <img
                            src={logo}
                            height="100px"
                            className={styles.logo}
                        />
                        <UserTypePicker setUserType={setUserType} />
                    </div>
                }
                formContainer={<LoginForm userType={userType} />}
            />
        </React.Fragment>
    );
};

export default LoginPage;
