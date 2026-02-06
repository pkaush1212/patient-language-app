import React from "react";
import { UserTypes } from "../../config/constants";
import { InterpreterAccountForm } from "./interpreter/InterpreterAccountForm";
import { RequesterAccountForm } from "./requester/RequesterAccountForm";

interface CreateAccountProps {
    userType: UserTypes;
}

export const CreateAccount: React.FC<CreateAccountProps> = ({ userType }) => {
    return userType === UserTypes.REQUESTER ? (
        <RequesterAccountForm />
    ) : (
        <InterpreterAccountForm />
    );
};
