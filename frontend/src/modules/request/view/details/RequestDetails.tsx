import { Chip, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AppointmentModes } from "../../../../config/appointmentMode";
import { ClinicalSetting } from "../../../../config/clinicalSetting";
import { RequestDetailsContext } from "../../../../shared/contexts/RequestDetailsContextProvider";
import { getDateString, getTimeString } from "../../../../utils/functions";
import DetailsRow from "./DetailsRow";

interface RequestDetailsProps {}

const useStyles = makeStyles((theme: Theme) => ({
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        justifyItems: "space-between",
    },
    languageChipContainer: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(0.5),
        },
    },
}));

// TODO: Prevent hard-linking to request not allowed access to.
const RequestDetails: React.FC<RequestDetailsProps> = () => {
    const styles = useStyles();
    const { requestDetails } = useContext(RequestDetailsContext);
    const request = requestDetails.request;

    return (
        <div className={styles.details}>
            <DetailsRow
                label={"Date & Time"}
                content={
                    <Typography>
                        {`${getDateString(
                            new Date(request!.date)
                        )}, ${getTimeString(new Date(request!.date))}`}
                    </Typography>
                }
            />

            <DetailsRow
                label={"Languages"}
                content={
                    <div className={styles.languageChipContainer}>
                        {request?.languageRequired.map((language) => {
                            return (
                                <Chip
                                    key={language}
                                    size="small"
                                    color="primary"
                                    label={language}
                                ></Chip>
                            );
                        })}
                    </div>
                }
            />

            <DetailsRow
                label={"Platform"}
                content={
                    <Typography>
                        {AppointmentModes[request?.interpretationMode]}
                    </Typography>
                }
            />

            <DetailsRow
                label={"Clinical Setting"}
                content={
                    <Typography>
                        {ClinicalSetting[request?.clinicalSetting]}
                    </Typography>
                }
            />

            {request?.dialect && (
                <DetailsRow
                    label={"Dialect"}
                    content={<Typography>{request?.dialect}</Typography>}
                />
            )}

            {request?.patientGender && (
                <DetailsRow
                    label={"Patient Gender"}
                    content={<Typography>{request?.patientGender}</Typography>}
                />
            )}

            {request?.department && (
                <DetailsRow
                    label={"Department"}
                    content={<Typography>{request?.department}</Typography>}
                />
            )}

            {request?.requestNotes && (
                <DetailsRow
                    label={"Request Notes"}
                    content={<Typography>{request?.requestNotes}</Typography>}
                />
            )}
        </div>
    );
};

export default RequestDetails;
