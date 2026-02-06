import React, { useState } from "react";
import {
    INTERPRETER_USER_LABEL,
    SERVICE_REQUESTER_USER_LABEL,
    UserTypes,
} from "../../config/constants";
import NavMenuPills from "../../ui/navigation/NavMenuPills";

interface UserTypePickerProps {
    setUserType: React.Dispatch<React.SetStateAction<UserTypes>>;
}

const UserTypePicker: React.FC<UserTypePickerProps> = ({ setUserType }) => {
    const [userTypeLabel, setUserTypeLabel] = useState(
        SERVICE_REQUESTER_USER_LABEL
    );

    const handleChange = (label) => {
        setUserTypeLabel(label);

        switch (label) {
            case SERVICE_REQUESTER_USER_LABEL:
                setUserType(UserTypes.REQUESTER);
                break;
            case INTERPRETER_USER_LABEL:
                setUserType(UserTypes.INTERPRETER);
                break;
            default:
                break;
        }
    };

    return (
        <NavMenuPills
            items={[SERVICE_REQUESTER_USER_LABEL, INTERPRETER_USER_LABEL]}
            active={userTypeLabel}
            setActive={handleChange}
        />
    );
};

export default UserTypePicker;
