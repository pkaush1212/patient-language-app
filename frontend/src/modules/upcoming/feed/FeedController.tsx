import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import {
    INTERPRETER_NO_APPOINTMENTS_FOUND,
    REQUESTER_NO_REQUESTS_FOUND,
    UserTypes,
} from "../../../config/constants";
import IRequest from "../../../config/types/entities/IRequest";
import NoResults404Splash from "../../../shared/components/NoResults404Splash";
import { UserInfoContext } from "../../../shared/contexts/UserContextProvider";
import TextWithRightLabel from "../../../ui/Elements/TextWithRightLabel";
import CardController, { ICardInfo } from "../../cards/CardController";

// we need key and timestamp mapping.

export interface IFeedData {
    monthsToTimestamp: number[];
    monthsToData: IRequest[][];
}

interface FeedControllerProps {
    data: IFeedData;
    requestToCard: (request: IRequest) => ICardInfo;
}

/**
 * Common FeedController that displays what cards its given.
 * take requests/appointments, filter and display the cards in scrollable grid.
 * @param
 * @returns
 */
const FeedController: React.FC<FeedControllerProps> = ({
    data,
    requestToCard,
}) => {
    const [cards, setCards] = useState<ICardInfo[][]>([[]]);
    const { userInfo } = useContext(UserInfoContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const cards: ICardInfo[][] = [];
        Object.keys(data.monthsToTimestamp)
            .sort(function (a, b) {
                return data.monthsToTimestamp[b] - data.monthsToTimestamp[a];
            })
            .map((monthYearKey) => {
                const requests: IRequest[] = data.monthsToData[monthYearKey];
                const monthYearCards: ICardInfo[] = requests.map((request) => {
                    return requestToCard(request);
                });

                cards[monthYearKey] = monthYearCards;
                return cards;
            });

        setCards(cards);
        setLoaded(true);
    }, [data, requestToCard]);

    return loaded && Object.keys(cards).length > 0 ? (
        <div>
            {Object.keys(cards).map((monthYearKey) => {
                return (
                    <Grid key={monthYearKey} container>
                        <TextWithRightLabel text={monthYearKey} />

                        <Grid
                            container
                            alignItems="flex-start"
                            direction="row"
                            spacing={2}
                        >
                            {cards[monthYearKey]?.map((card, idx) => {
                                return (
                                    <CardController
                                        key={`${monthYearKey}-${idx}`}
                                        data={card}
                                    />
                                );
                            })}
                        </Grid>
                    </Grid>
                );
            })}
        </div>
    ) : (
        <NoResults404Splash
            message={
                userInfo?._type === UserTypes.REQUESTER
                    ? REQUESTER_NO_REQUESTS_FOUND
                    : INTERPRETER_NO_APPOINTMENTS_FOUND
            }
        />
    );
};
export default FeedController;
