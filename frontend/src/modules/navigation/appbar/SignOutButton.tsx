import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";

interface SignOutButtonProps {}

const SignOutButton: React.FC<SignOutButtonProps> = () => {
    const { setUserInfo } = useContext(UserInfoContext);
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={() => setUserInfo(null)}
        >
            Sign out
        </Button>
    );
};

export default SignOutButton;
