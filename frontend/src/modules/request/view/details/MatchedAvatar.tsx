import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {
    CANCELLED_MATCH_CARD_STRING,
    IS_MATCHED_CARD_STRING,
    PENDING_MATCH_CARD_STRING,
    RequestState,
    UserTypes,
} from "../../../../config/constants";
import IAppointment from "../../../../config/types/entities/IAppointment";
import IInterpreter from "../../../../config/types/entities/IInterpreter";
import IRequest from "../../../../config/types/entities/IRequest";
import IRequester from "../../../../config/types/entities/IRequester";
import { RequestDetailsContext } from "../../../../shared/contexts/RequestDetailsContextProvider";
import { UserInfoContext } from "../../../../shared/contexts/UserContextProvider";
import AvatarIcon from "../../../../ui/Elements/AvatarIcon";

interface MatchedAvatarProps {}

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        paddingTop: "2%",
        paddingLeft: "2%",
    },
    innerContainer: {
        paddingLeft: "1.5%",
        paddingTop: ".5%",
        display: "flex",
        flexDirection: "column",
    },
    avatar: {},
    name: {},
    statusText: {},
}));

const MatchedAvatar: React.FC<MatchedAvatarProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [initials, setInitials] = useState<string | null>(null);
    const [name, setName] = useState("TBD");

    const { requestDetails } = useContext(RequestDetailsContext);

    const styles = useStyles();

    useEffect(() => {
        switch (userInfo?._type) {
            case UserTypes.INTERPRETER:
                const requester = requestDetails.request
                    ?.requester as IRequester;
                setName(requester?.firstName + " " + requester?.lastName);
                setInitials(
                    requester?.firstName?.charAt(0) +
                        requester?.lastName?.charAt(0)
                );
                break;
            case UserTypes.REQUESTER:
                const interpreter = (
                    requestDetails.request?.appointment as IAppointment
                )?.interpreter as IInterpreter;

                if (interpreter) {
                    setName(interpreter.firstName + " " + interpreter.lastName);
                    setInitials(
                        interpreter?.firstName?.charAt(0) +
                            interpreter?.lastName?.charAt(0)
                    );
                }
                break;
        }
    }, [requestDetails]);

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <AvatarIcon radiusSize={64} size="large" content={initials} />
            </div>

            <div className={styles.innerContainer}>
                <div>
                    <Typography className={styles.name}>{name}</Typography>
                </div>

                <div>
                    <Typography className={styles.statusText}>
                        {requestDetails.request?.state === RequestState.MATCHED
                            ? IS_MATCHED_CARD_STRING
                            : requestDetails.request?.state ===
                              RequestState.CANCELLED
                            ? CANCELLED_MATCH_CARD_STRING
                            : PENDING_MATCH_CARD_STRING}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default MatchedAvatar;
