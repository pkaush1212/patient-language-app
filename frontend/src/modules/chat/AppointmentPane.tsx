import { CometChat } from "@cometchat-pro/chat";
import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Appointment from "../../api/appointment";
import Request from "../../api/request";
import { AppointmentModes } from "../../config/appointmentMode";
import { ClinicalSetting } from "../../config/clinicalSetting";
import { FrontendRoutes } from "../../config/frontendRoutes";
import IAppointment from "../../config/types/entities/IAppointment";
import IRequest from "../../config/types/entities/IRequest";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import AvatarIcon from "../../ui/Elements/AvatarIcon";
import {
    getDateString,
    getTimeString,
    toTitleCase,
} from "../../utils/functions";
import { getCometGroupInfo } from "./services/CometGroupServices";

interface AppointmentPaneProps {
    guid: string;
}

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: "25%",
        width: "100%",
        minHeight: "100%",
        alignItems: "center",
    },
    avatarMenu: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5%",
    },
    avatar: {
        alignSelf: "center",
        paddingBottom: "2%",
    },
    groupText: {
        alignSelf: "center",
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "5%",
        justifyContent: "space-between",
    },
    infoBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        whiteSpace: "pre-wrap",
        paddingBlock: "5%",
        marginLeft: "5%",
    },
    viewCta: {
        alignSelf: "center",
        marginTop: "5%",
        marginLeft: "20%",
    },
}));

// TODO: Handle if it is a chat not for an appointment.
const AppointmentPane: React.FC<AppointmentPaneProps> = ({ guid }) => {
    const [request, setRequest] = useState<IRequest | null>(null);
    const [groupName, setGroupName] = useState<string>("");
    const { userInfo } = useContext(UserInfoContext);

    const history = useHistory();
    const styles = useStyles();

    const getRequestAndSaveToState = async () => {
        await Request.getById(guid, userInfo!.accessToken)
            .then((res) => {
                const request: IRequest = res.data;
                setRequest(request);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getAppointmentAndSaveRequestToState = async () => {
        await Appointment.getById(guid, userInfo!.accessToken)
            .then((res) => {
                const appointment: IAppointment = res.data;
                const request: IRequest = appointment.request as IRequest;
                setRequest(request);
            })
            .catch(async (error) => {
                // Failed to get appointment, could be a request?
                await getRequestAndSaveToState();
                console.error(error);
            });
    };

    const getGroupDetails = async () => {
        await getAppointmentAndSaveRequestToState();

        const group: CometChat.Group = await getCometGroupInfo(guid);
        setGroupName(group.getName());
    };

    useEffect(() => {
        getGroupDetails();
    }, [guid]);

    const onClickViewRequest = () => {
        if (request) {
            history.push({
                pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request!._id}`,
            });
        }
    };

    // TODO: Improve layout by using card grid.
    return (
        <div className={styles.root}>
            <Card>
                <CardContent>
                    <div className={styles.avatarMenu}>
                        <div className={styles.avatar}>
                            <AvatarIcon
                                size="large"
                                radiusSize={64}
                                content={groupName.charAt(0)}
                            />
                        </div>
                        <div className={styles.groupText}>
                            <Typography>{groupName}</Typography>
                        </div>
                    </div>
                    <div className={styles.infoContainer}>
                        {request ? (
                            <React.Fragment>
                                <div className={styles.infoBlock}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        Date & Time:
                                    </Typography>
                                    <Typography>
                                        {request &&
                                            `${getDateString(
                                                new Date(request.date)
                                            )} at ${getTimeString(
                                                new Date(request.date)
                                            )}`}
                                    </Typography>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Clinical Setting:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            {
                                                ClinicalSetting[
                                                    request?.clinicalSetting
                                                ]
                                            }
                                        </Typography>
                                    </div>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Platform:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            {
                                                AppointmentModes[
                                                    request?.interpretationMode
                                                ]
                                            }
                                        </Typography>
                                    </div>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div>
                                        <Typography
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Languages:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            {request?.languageRequired
                                                .map((language) =>
                                                    toTitleCase(language)
                                                )
                                                .join(", ")}
                                        </Typography>
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className={styles.infoBlock}>
                                <CardContent>
                                    <Typography variant="body2">
                                        This request no longer exists. It may
                                        have been deleted by the owner.
                                    </Typography>
                                </CardContent>
                            </div>
                        )}
                    </div>

                    {request && (
                        <div className={styles.viewCta}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onClickViewRequest}
                            >
                                View Request
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentPane;
