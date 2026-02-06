import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { PALETTE } from "../../config/colors";
import { RequestState } from "../../config/constants";

const CalendarAppointment = ({ children, style, restProps, data }) => {
    const backgroundColor = (() => {
        switch (data?.state) {
            case RequestState.MATCHED:
                return PALETTE.SUCCESS_GREEN_DARK;
            case RequestState.PENDING:
                return PALETTE.PENDING_RED;
            default:
            case RequestState.CANCELLED:
                return PALETTE.CANCELLED_GREY;
        }
    })();

    return (
        <Appointments.Appointment
            {...restProps}
            style={{ ...style, backgroundColor }}
            onClick={() => {
                if (data?.onClick) {
                    data.onClick();
                }
            }}
        >
            {children}
        </Appointments.Appointment>
    );
};

export default CalendarAppointment;
