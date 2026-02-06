import { Typography } from "@material-ui/core";
import React from "react";

interface RequestStatusTextProps {
    text: string;
    color: string;
}

const RequestStatusText: React.FC<RequestStatusTextProps> = ({
    text,
    color,
}) => {
    return (
        <div>
            <Typography style={{ color }} variant="h6">
                {text}
            </Typography>
        </div>
    );
};

export default RequestStatusText;
