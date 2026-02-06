// @ts-nocheck

import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoundedTextField from "./RoundedTextField";

interface RoundedDateTimePickerProps {
    required?: boolean;
    label: string;
    startDate: Date | null;
    setStartDate: (Date) => void;
    extraProps?;
}

const RoundedDateTimePicker: React.FC<RoundedDateTimePickerProps> = ({
    label,
    required,
    startDate,
    setStartDate,
    extraProps
}) => {
    const RoundedDateTimeInput = forwardRef((props, ref) => {
        const { value, onClick, label } = props;

        return (
            <RoundedTextField
                label={label}
                required={required}
                textFieldProps={{ ref, onClick, value }}
            />
        );
    });

    return (
        <DatePicker
            selected={startDate}
            showTimeSelect
            onChange={(date) => setStartDate(date)}
            customInput={<RoundedDateTimeInput label={label} />}
            dateFormat="MMMM d, yyyy h:mm aa"
            popperModifiers={{
                preventOverflow: {
                    enabled: true,
                },
            }}
            {...extraProps}
        />
    );
};

export default RoundedDateTimePicker;
