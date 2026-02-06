import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { IconButton, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

interface DatePickerProps {
    label: string;
    date: Date | null;
    onSelect: (date: Date | null) => void;
    onClear: () => void;
}

const useStyles = makeStyles(() => ({
    dateContainer: {
        paddingLeft: "1%",
    },
}));

const MuiDatePicker: React.FC<DatePickerProps> = ({
    label,
    date,
    onSelect,
    onClear,
}) => {
    const styles = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dateContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    fullWidth
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    margin="dense"
                    id={"date-picker-" + label}
                    label={label}
                    value={date}
                    onChange={(date) => {
                        onSelect(date);
                        setIsOpen(false);
                    }}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                        onFocus: (e) => {
                            setIsOpen(true);
                        },
                    }}
                    PopoverProps={{
                        disableRestoreFocus: true,
                        onClose: () => {
                            setIsOpen(false);
                        },
                    }}
                    InputProps={{
                        onFocus: () => {
                            setIsOpen(true);
                        },
                    }}
                    open={isOpen}
                />
                <div>
                    {date !== null && (
                        <div>
                            <IconButton
                                size="small"
                                style={{ marginTop: -2 }}
                                onClick={(e) => onClear()}
                            >
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </div>
                    )}
                </div>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default MuiDatePicker;
