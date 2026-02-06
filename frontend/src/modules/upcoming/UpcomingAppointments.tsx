import { AxiosPromise } from "axios";
import React, { useEffect, useReducer, useState } from "react";
import IRequest from "../../config/types/entities/IRequest";
import ErrorResponse from "../../config/types/errorResponse";
import { getMonthAndYearKeyTimestamp } from "../../utils/functions";
import FeedController from "./feed/FeedController";
import { IFeedData } from "./feed/FeedController";
import SearchBar from "../../ui/Elements/SearchBar";
import DatePicker from "../../ui/Form/MuiDatePicker";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import IconWithTextRight from "../../ui/Elements/IconWithTextRight";
import { CLICK_CARD_TO_VIEW } from "../../config/constants";
import { makeStyles, Typography } from "@material-ui/core";
import {
    END_DATE_CLEARED,
    END_DATE_SELECTED,
    initialDateRangeState,
    START_DATE_CLEARED,
    START_DATE_SELECTED,
    upcomingReducer,
} from "../../shared/reducers/upcoming";
import { ICardInfo } from "../cards/CardController";
import { useSnackbar } from "notistack";
import { PALETTE } from "../../config/colors";

interface UpcomingAppointmentsProps {
    title: string;
    onLoad: (queries?) => Promise<IRequest[]>;
    requestToCard: (request: IRequest) => ICardInfo;
    onSearch?: () => AxiosPromise<IRequest[]>;
}

const useStyles = makeStyles((theme) => ({
    searchFilter: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: "1%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            padding: "2%",
        },
    },
    infoTextContainer: {
        marginTop: "1%",
        marginLeft: ".5%",
        verticalAlign: "top",
        paddingBottom: ".1%",
        [theme.breakpoints.down("sm")]: {
            paddingBottom: "1%",
        },
    },
    titleText: {
        marginLeft: "1%",
        fontSize: 25,
        fontWeight: 600,
        paddingTop: "2%",
    },
    feed: {
        // only inner scrolling on desktop, as it makes for bad ux on mobile.
        [theme.breakpoints.up("sm")]: {
            height: "75vh",
            overflow: "auto",
            overflowY: "scroll",
            overflowX: "hidden",
        },
    },
}));

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
    title,
    onLoad,
    requestToCard,
}) => {
    const styles = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [feedData, setFeedData] = useState<IFeedData>({
        monthsToTimestamp: [],
        monthsToData: [[]],
    });

    const [dateState, dispatch] = useReducer(
        upcomingReducer,
        initialDateRangeState
    );

    const mapRequestsToFeed = (requests: IRequest[]): IFeedData => {
        const monthsToTimestamp: number[] = [];
        const monthsToData: IRequest[][] = [];

        requests.map((request: IRequest) => {
            const { key, timestamp } = getMonthAndYearKeyTimestamp(
                new Date(request.date)
            );
            monthsToTimestamp[key] = timestamp;

            if (!monthsToData[key]) {
                monthsToData[key] = [];
            }

            monthsToData[key].push(request);
            return monthsToData;
        });

        return {
            monthsToTimestamp,
            monthsToData,
        };
    };

    useEffect(() => {
        const fetchDataAndSave = async () => {
            const queries = {
                from: dateState?.startDate
                    ? new Date(dateState?.startDate)
                          ?.toISOString()
                          ?.split("T")[0]
                    : null,
                to: dateState?.endDate
                    ? new Date(dateState?.endDate)?.toISOString().split("T")[0]
                    : null,
            };

            return onLoad(queries)
                .then((requests: IRequest[]) => {
                    const feedData: IFeedData = mapRequestsToFeed(requests);
                    setFeedData(feedData);
                })
                .catch((error: ErrorResponse) => {
                    enqueueSnackbar(error.message, { variant: "error" });
                });
        };

        fetchDataAndSave();
    }, [dateState]);

    return (
        <div>
            <Typography className={styles.titleText}>{title}</Typography>

            <div className={styles.searchFilter}>
                <SearchBar />
                <DatePicker
                    label="start"
                    date={dateState?.startDate}
                    onSelect={(date) => {
                        dispatch({ type: START_DATE_SELECTED, payload: date });
                    }}
                    onClear={async () => {
                        dispatch({ type: START_DATE_CLEARED });
                    }}
                />
                <DatePicker
                    label="end"
                    date={dateState?.endDate}
                    onSelect={(date) => {
                        dispatch({ type: END_DATE_SELECTED, payload: date });
                    }}
                    onClear={() => {
                        dispatch({ type: END_DATE_CLEARED });
                    }}
                />
            </div>
            <div className={styles.infoTextContainer}>
                <IconWithTextRight
                    icon={
                        <EmojiObjectsIcon
                            style={{ color: PALETTE.PRIMARY_ALT }}
                        />
                    }
                    text={CLICK_CARD_TO_VIEW}
                    textStyle={{ color: "#828282" }}
                />
            </div>

            <div className={styles.feed}>
                <FeedController data={feedData} requestToCard={requestToCard} />
            </div>
        </div>
    );
};

export default UpcomingAppointments;
