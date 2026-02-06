import React, { useContext } from "react";
import { useHistory } from "react-router";
import Interpreter from "../../../api/interpreter";
import { INTERPRETER_UPCOMING_DASH_TITLE } from "../../../config/constants";
import { ClinicalSetting } from "../../../config/clinicalSetting";
import FrontendRoutes from "../../../config/frontendRoutes";
import IAppointment from "../../../config/types/entities/IAppointment";
import IRequest from "../../../config/types/entities/IRequest";
import IRequester from "../../../config/types/entities/IRequester";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import { cleanAllEmptyOrNullFieldsFromObject } from "../../../utils/functions";
import { ICardInfo } from "../../cards/CardController";
import {
    createCardDateRow,
    createCardTimeRow,
    createCardAppointmentModeRow,
    createCardLanguagesFooter,
    createCardStateSideText,
    createCardAccentColor,
    createCardChatChip,
    createCardRequesterInfoRow,
} from "../../cards/CardUtils";
import InnerContainerWithBorder from "../../layouts/InnerContainerWithBorder";
import UpcomingAppointments from "../../upcoming/UpcomingAppointments";

interface InterpreterDashProps {}

const InterpreterDash: React.FC<InterpreterDashProps> = () => {
    // set the user info in context once sign up done
    const { userInfo } = useContext(UserInfoContext);

    const history = useHistory();

    return (
        <InnerContainerWithBorder
            content={
                <UpcomingAppointments
                    title={INTERPRETER_UPCOMING_DASH_TITLE}
                    onLoad={(queries?) => {
                        cleanAllEmptyOrNullFieldsFromObject(queries);

                        return new Promise((resolve, reject) => {
                            Interpreter.getAppointments(
                                userInfo!.accessToken,
                                queries
                            )
                                .then((res) => {
                                    const appointments: IAppointment[] =
                                        res.data;
                                    const requests: IRequest[] =
                                        appointments.map(
                                            (appointment) =>
                                                appointment.request as IRequest
                                        );
                                    resolve(requests);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        });
                    }}
                    requestToCard={(request: IRequest) => {
                        const requester: IRequester = request.requester;

                        const cardData: ICardInfo = {
                            title: ClinicalSetting[request.clinicalSetting],
                            cardTitleRight: requester
                                ? createCardChatChip(
                                      history,
                                      request.appointment as string
                                  )
                                : undefined,
                            row1: createCardRequesterInfoRow(requester),
                            row2: createCardDateRow(new Date(request.date)),
                            row3: createCardTimeRow(new Date(request.date)),
                            row4: createCardAppointmentModeRow(
                                request.interpretationMode
                            ),
                            footer: createCardLanguagesFooter(
                                request.languageRequired
                            ),
                            accentColor: createCardAccentColor(request.state),
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

export default InterpreterDash;
