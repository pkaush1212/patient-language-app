import React from "react";
import UpcomingCardRowInfo, {
    UpcomingCardRowInfoProps,
} from "./UpcomingCardRowInfo";
import cx from "clsx";
import UpcomingCardFooter, {
    UpcomingCardFooterProps,
} from "./UpcomingCardFooter";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle } from "@mui-treasury/components/info";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import UpcomingCardSideText, {
    UpcomingCardSideTextProps,
} from "./UpcomingCardSideText";

interface UpcomingCardProps {
    cardTitle: string;
    cardTitleRight?: JSX.Element;
    row1: UpcomingCardRowInfoProps;
    row2: UpcomingCardRowInfoProps;
    row3: UpcomingCardRowInfoProps;
    row4?: UpcomingCardRowInfoProps;
    accentColor?: string;
    sideText?: UpcomingCardSideTextProps;
    footer: UpcomingCardFooterProps;
    onClickAction;
}

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 344,
        maxWidth: 344,
        minHeight: 210,
        maxHeight: 220,
        margin: "auto",
        boxShadow: "none",
        borderRadius: 10,
    },
    card: {
        zIndex: 1,
        borderRadius: 12,
        boxShadow: "0 6px 20px 0 #dbdbe8",
        backgroundColor: "#F8F8FC",
        transition: "0.4s",
        height: "100%",
    },
    cardTitleRight: {
        marginTop: "2%",
    },
}));

const UpcomingCard: React.FC<UpcomingCardProps> = ({
    cardTitle,
    cardTitleRight,
    row1,
    row2,
    row3,
    row4,
    accentColor,
    sideText,
    footer,
    onClickAction,
}) => {
    const styles = useStyles();
    const shadowStyles = useBouncyShadowStyles();

    return (
        <div
            className={cx(shadowStyles.root, styles.root)}
            onClick={onClickAction}
        >
            <Column
                style={{ borderLeft: `10px solid ${accentColor}` }}
                className={styles.card}
            >
                <Row p={2}>
                    <Info position={"left"}>
                        <InfoTitle>{cardTitle}</InfoTitle>
                    </Info>
                    <Item position={"right"} className={styles.cardTitleRight}>
                        {cardTitleRight}
                    </Item>
                </Row>
                <Box
                    px={2}
                    color={"grey.800"}
                    fontSize={"1.05rem"}
                    fontFamily={"Ubuntu"}
                >
                    {sideText && (
                        <Item position={"middle-right"}>
                            <UpcomingCardSideText {...sideText} />
                        </Item>
                    )}

                    <Item position={"left"}>
                        <UpcomingCardRowInfo {...row1} />
                        <UpcomingCardRowInfo {...row2} />
                        <UpcomingCardRowInfo {...row3} />
                        {row4 && <UpcomingCardRowInfo {...row4} />}
                    </Item>
                </Box>
                <Row px={1} py={2} position={"top"}>
                    <UpcomingCardFooter {...footer} />
                </Row>
            </Column>
        </div>
    );
};

export default UpcomingCard;
