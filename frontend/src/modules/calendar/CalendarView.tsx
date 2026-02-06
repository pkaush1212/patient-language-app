import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DayView,
    DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import CalendarAppointment from "./CalendarAppointment";

interface CalendarViewProps {
    appointments: AppointmentModel[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ appointments }) => {
    const [currentViewName, setCurrentViewName] = useState("month");

    return (
        <Paper>
            <Scheduler data={appointments} height="auto">
                <ViewState
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                />
                <DayView name="day" startDayHour={8} endDayHour={20} />
                <WeekView name="week" startDayHour={8} endDayHour={20} />
                <MonthView name="month" />
                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments
                    // @ts-ignore
                    appointmentComponent={CalendarAppointment}
                />
            </Scheduler>
        </Paper>
    );
};

export default CalendarView;
