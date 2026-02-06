import React, { useContext } from "react";
import { useHistory } from "react-router";
import Requester from "../../../api/requester";
import {
    NO_INTERPRETER_STRING,
    REQUESTER_UPCOMING_DASH_TITLE,
} from "../../../config/constants";
import FrontendRoutes from "../../../config/frontendRoutes";
import IAppointment from "../../../config/types/entities/IAppointment";
import IInterpreter from "../../../config/types/entities/IInterpreter";
import IRequest from "../../../config/types/entities/IRequest";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import {
    cleanAllEmptyOrNullFieldsFromObject,
    truncateString,
} from "../../../utils/functions";
import { ICardInfo } from "../../cards/CardController";
import {
    createCardAccentColor,
    createCardAppointmentModeRow,
    createCardChatChip,
    createCardDateRow,
    createCardLanguagesFooter,
    createCardStateSideText,
    createCardTimeRow,
} from "../../cards/CardUtils";
import InnerContainerWithBorder from "../../layouts/InnerContainerWithBorder";
import UpcomingAppointments from "../../upcoming/UpcomingAppointments";

interface RequesterDashProps {}

const RequesterDash: React.FC<RequesterDashProps> = () => {
    // set the user info in context once sign up done
    const { userInfo } = useContext(UserInfoContext);

    const history = useHistory();

    return (
        <InnerContainerWithBorder
            content={
                <UpcomingAppointments
                    title={REQUESTER_UPCOMING_DASH_TITLE}
                    onLoad={(queries?) => {
                        cleanAllEmptyOrNullFieldsFromObject(queries);

                        return new Promise((resolve, reject) => {
                            Requester.getRequests(
                                userInfo!.accessToken,
                                queries
                            )
                                .then((res) => {
                                    resolve(res.data as IRequest[]);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        });
                    }}
                    requestToCard={(request: IRequest) => {
                        const interpreter: IInterpreter = (
                            request.appointment as IAppointment
                        )?.interpreter as IInterpreter;

                        const cardData: ICardInfo = {
                            title: interpreter
                                ? truncateString(
                                      interpreter.firstName +
                                          " " +
                                          interpreter.lastName
                                  )
                                : NO_INTERPRETER_STRING,
                            cardTitleRight: interpreter
                                ? createCardChatChip(
                                      history,
                                      (
                                          request.appointment as IAppointment
                                      )._id?.toString()
                                  )
                                : undefined,
                            row1: createCardDateRow(new Date(request.date)),
                            row2: createCardTimeRow(new Date(request.date)),
                            row3: createCardAppointmentModeRow(
                                request.interpretationMode
                            ),
                            accentColor: createCardAccentColor(request.state),
                            footer: createCardLanguagesFooter(
                                request.languageRequired
                            ),
                            sideText: createCardStateSideText(request.state),
                            onClickAction: () =>
                                history.push({
                                    pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request._id}`,
                                }),
                        };

                        return cardData;
                    }}
                />
            }
        />
    );
};

export default RequesterDash;
