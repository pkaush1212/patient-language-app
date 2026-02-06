import React from "react";
import { UpcomingCardFooterProps } from "../../ui/Elements/card/UpcomingCardFooter";
import { UpcomingCardRowInfoProps } from "../../ui/Elements/card/UpcomingCardRowInfo";
import { Grid, makeStyles } from "@material-ui/core";
import UpcomingCard from "../../ui/Elements/card/UpcomingCard";
import { UpcomingCardSideTextProps } from "../../ui/Elements/card/UpcomingCardSideText";

export interface ICardInfo {
    title: string;
    cardTitleRight?: JSX.Element;
    row1: UpcomingCardRowInfoProps;
    row2: UpcomingCardRowInfoProps;
    row3: UpcomingCardRowInfoProps;
    row4?: UpcomingCardRowInfoProps;
    footer: UpcomingCardFooterProps;
    sideText?: UpcomingCardSideTextProps;
    accentColor?: string; // TODO: Convert to fixed enum
    onClickAction;
}

interface CardControllerProps {
    data: ICardInfo;
}

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        [theme.breakpoints.down("sm")]: {
            marginTop: "3%",
            marginBottom: "3%",
        },
        marginTop: "2%",
        marginBottom: "2%",
    },
}));

const CardController: React.FC<CardControllerProps> = ({ data }) => {
    const {
        title,
        cardTitleRight,
        row1,
        row2,
        row3,
        row4,
        sideText,
        footer,
        accentColor,
        onClickAction,
    } = data;
    const styles = useStyles();

    return (
        <Grid className={styles.cardGrid} item xs={12} md={6} lg={4} xl={3}>
            <UpcomingCard
                cardTitle={title}
                cardTitleRight={cardTitleRight}
                row1={row1}
                row2={row2}
                row3={row3}
                row4={row4}
                accentColor={accentColor}
                sideText={sideText}
                footer={footer}
                onClickAction={onClickAction}
            />
        </Grid>
    );
};

export default CardController;
