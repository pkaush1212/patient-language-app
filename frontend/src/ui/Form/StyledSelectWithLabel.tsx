import { InputLabel, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { roundTextFieldStylesHook } from "@mui-treasury/styles/textField/round";
import { FieldProps } from "formik";

const customStyles = {
    control: (base, state) => ({
        ...base,
        border: state.isFocused ? "1px solid #3f51b5 !important" : base.border,
    }),
};

const useStyles = makeStyles(() => ({
    label: {
        paddingTop: "3%",
    },
    select: {
        paddingTop: "2%",
    },
}));

interface ISelectOptions {
    multiple: boolean;
    selections: any;
}

interface StyledSelectProps {
    required?: boolean;
    label: string;
    options: ISelectOptions;
}

const StyledSelectWithLabel: React.FC<StyledSelectProps & FieldProps> = ({
    label,
    options,
    form,
    field,
    required,
}) => {
    const styles = useStyles();
    const animatedComponents = makeAnimated();

    const [focused, setFocused] = useState(false);
    const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();

    const { multiple, selections } = options;

    return (
        <div>
            <InputLabel
                className={styles.label}
                shrink={true}
                classes={inputLabelStyles}
                focused={focused}
                required={required}
            >
                {label}
            </InputLabel>
            <div className={styles.select}>
                <Select
                    styles={customStyles}
                    closeMenuOnSelect={!multiple}
                    components={animatedComponents}
                    isMulti={multiple}
                    value={
                        multiple
                            ? field.value === undefined ||
                              field.value === null ||
                              field.value === ""
                                ? []
                                : options.selections.filter((option) => {
                                      return field.value
                                          ?.map((field) => field.value)
                                          .includes(option.value);
                                  })
                            : options
                            ? options.selections.find(
                                  (option) => option.value === field.value
                              )
                            : ""
                    }
                    onChange={(option) => {
                        return multiple
                            ? form.setFieldValue(field.name, option)
                            : form.setFieldValue(field.name, option.value);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        field.onBlur(e);
                    }}
                    onFocus={() => setFocused(true)}
                    options={selections}
                />
            </div>
        </div>
    );
};

export default StyledSelectWithLabel;
