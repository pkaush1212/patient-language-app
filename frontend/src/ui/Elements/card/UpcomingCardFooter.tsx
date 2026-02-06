import { Chip, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

export interface UpcomingCardFooterProps {
    footerContent: JSX.Element[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > *": {
                margin: theme.spacing(0.5),
            },
        },
    })
);

// todo: we need to generalize this
const UpcomingCardFooter: React.FC<UpcomingCardFooterProps> = ({
    footerContent,
}) => {
    const classes = useStyles();

    return <div className={classes.root}>{footerContent}</div>;
};

export default UpcomingCardFooter;
