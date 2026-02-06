import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import React, { useContext, useEffect, useState } from "react";
import Interpreter from "../../api/interpreter";
import Requester from "../../api/requester";
import {
    CALENDAR_TITLE,
    NO_INTERPRETER_STRING,
    UserTypes,
} from "../../config/constants";
import { DEFAULT_APPOINTMENT_DURATION } from "../../config/properties";
import IAppointment from "../../config/types/entities/IAppointment";
import IInterpreter from "../../config/types/entities/IInterpreter";
import IRequest from "../../config/types/entities/IRequest";
import CalendarView from "../../modules/calendar/CalendarView";
import { UserInfoContext } from "../../shared/contexts/UserContextProvider";
import { truncateString } from "../../utils/functions";
import Helmet from "react-helmet";
import { useHistory } from "react-router";
import FrontendRoutes from "../../config/frontendRoutes";

interface CalendarPageProps {}

const CalendarPage: React.FC<CalendarPageProps> = () => {
    const { userInfo } = useContext(UserInfoContext);
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
    const history = useHistory();

    const fetchRequesterRequests = async () => {
        const data: AppointmentModel[] = [];

        await Requester.getRequests(userInfo!.accessToken).then((res) => {
            const requests: IRequest[] = res.data;
            requests.map((request) => {
                const interpreter: IInterpreter = (
                    request.appointment as IAppointment
                )?.interpreter as IInterpreter;

                const startDate = new Date(request.date);
                const endDate = new Date(startDate.getTime() + 3600);

                const calendarAppointment: AppointmentModel = {
                    title: interpreter
                        ? truncateString(
                              interpreter.firstName + " " + interpreter.lastName
                          )
                        : NO_INTERPRETER_STRING,
                    startDate,
                    endDate,
                    _id: request._id,
                    state: request.state,
                    onClick: () => {
                        history.push({
                            pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request._id}`,
                        });
                    },
                };

                data.push(calendarAppointment);
            });
        });

        setAppointments(data);
    };

    const fetchInterpreterRequests = async () => {
        const data: AppointmentModel[] = [];

        await Interpreter.getAppointments(userInfo!.accessToken).then((res) => {
            const appointments: IAppointment[] = res.data;
            const requests: IRequest[] = appointments.map(
                (appointment) => appointment.request as IRequest
            );

            requests.map((request) => {
                const startDate = new Date(request.date);
                const endDate = new Date(
                    startDate.getTime() + DEFAULT_APPOINTMENT_DURATION
                );

                const calendarAppointment: AppointmentModel = {
                    title: request.clinicalSetting,
                    startDate,
                    endDate,
                    _id: request._id,
                    state: request.state,
                    onClick: () => {
                        history.push({
                            pathname: `${FrontendRoutes.REQUEST_ROUTE}/${request._id}`,
                        });
                    },
                };

                data.push(calendarAppointment);
            });
        });

        setAppointments(data);
    };

    useEffect(() => {
        switch (userInfo?._type) {
            case UserTypes.REQUESTER:
                fetchRequesterRequests();
                break;
            case UserTypes.INTERPRETER:
                fetchInterpreterRequests();
                break;
        }
    }, [userInfo]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{CALENDAR_TITLE}</title>
            </Helmet>
            <CalendarView appointments={appointments} />
        </React.Fragment>
    );
};

export default CalendarPage;
