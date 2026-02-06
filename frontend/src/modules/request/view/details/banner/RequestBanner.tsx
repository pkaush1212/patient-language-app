import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { PALETTE } from "../../../../../config/colors";
import {
    RequestState,
    REQ_BANNER_APPT_CANCELLED_SUB,
    REQ_BANNER_APPT_CANCELLED_TEXT,
    REQ_BANNER_APPT_CANCELLED_TITLE,
    REQ_BANNER_APPT_MATCHED_SUB,
    REQ_BANNER_APPT_MATCHED_TEXT,
    REQ_BANNER_APPT_MATCHED_TITLE,
    REQ_BANNER_APPT_PENDING_SUB,
    REQ_BANNER_APPT_PENDING_TITLE,
    UserTypes,
} from "../../../../../config/constants";
import { UserInfoContext } from "../../../../../shared/contexts/UserContextProvider";
import AcceptRequestBannerButton from "./AcceptRequestBannerButton";
import ChatWithRequesterBannerButton from "./ChatWithRequesterBannerButton";
import RequestStatusText from "./RequestStatusText";

interface RequestBannerProps {
    requestState: RequestState;
}

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        padding: "2%",
        backgroundColor: "#F9F9F9",
        width: "95%",

        borderRadius: "12",
    },
    textContainer: {},
    rightContainer: {
        marginLeft: "auto",
        marginRight: "2%",
    },
    bannerButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {},
    subtitle: {},
}));

const RequestBanner: React.FC<RequestBannerProps> = ({ requestState }) => {
    const styles = useStyles();
    const { userInfo } = useContext(UserInfoContext);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [cta, setCta] = useState<JSX.Element>(<div></div>);

    const matchedApptText = () => {
        return (
            <RequestStatusText
                text={REQ_BANNER_APPT_MATCHED_TEXT}
                color={PALETTE.SUCCESS_GREEN_DARK}
            />
        );
    };

    const pendingApptCta = () => {
        return userInfo?._type === UserTypes.INTERPRETER ? (
            <div className={styles.bannerButtonsContainer}>
                <AcceptRequestBannerButton />
                {/* <ChatWithRequesterBannerButton /> */}
            </div>
        ) : (
            <React.Fragment />
        );
    };

    const cancelledApptText = () => {
        return (
            <RequestStatusText
                text={REQ_BANNER_APPT_CANCELLED_TEXT}
                color={PALETTE.PENDING_RED}
            />
        );
    };

    useEffect(() => {
        switch (requestState) {
            case RequestState.MATCHED:
                setTitle(REQ_BANNER_APPT_MATCHED_TITLE);
                setSubtitle(REQ_BANNER_APPT_MATCHED_SUB);
                setCta(matchedApptText());
                break;

            case RequestState.PENDING:
                setTitle(REQ_BANNER_APPT_PENDING_TITLE);
                setSubtitle(REQ_BANNER_APPT_PENDING_SUB);
                setCta(pendingApptCta());
                break;

            case RequestState.CANCELLED:
                setTitle(REQ_BANNER_APPT_CANCELLED_TITLE);
                setSubtitle(REQ_BANNER_APPT_CANCELLED_SUB);
                setCta(cancelledApptText());
                break;
        }
    }, [requestState]);

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <Typography variant="h4">{title}</Typography>
                </div>
                <div className={styles.subtitle}>
                    <Typography variant="subtitle1">{subtitle}</Typography>
                </div>
            </div>
            <div className={styles.rightContainer}>{cta}</div>
        </div>
    );
};

export default RequestBanner;
