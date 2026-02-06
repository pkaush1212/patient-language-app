import { UpcomingCardRowInfoProps } from "../../ui/Elements/card/UpcomingCardRowInfo";
import {
    getDateString,
    getTimeString,
    truncateString,
} from "../../utils/functions";
import { CalendarToday, Schedule, Videocam } from "@material-ui/icons";
import { AppointmentModes } from "../../config/appointmentMode";
import { Languages } from "../../config/languages";
import { MAX_LANGUAGES_TO_SHOW_IN_CARD } from "../../config/properties";
import { Chip } from "@material-ui/core";
import { UpcomingCardSideTextProps } from "../../ui/Elements/card/UpcomingCardSideText";
import { UpcomingCardFooterProps } from "../../ui/Elements/card/UpcomingCardFooter";
import {
    CANCELLED_MATCH_CARD_STRING,
    IS_MATCHED_CARD_STRING,
    PENDING_MATCH_CARD_STRING,
    RequestState,
} from "../../config/constants";
import { PALETTE } from "../../config/colors";
import ChatIcon from "@material-ui/icons/Chat";
import IRequester from "../../config/types/entities/IRequester";
import PersonIcon from "@material-ui/icons/Person";
import { ChatStateNavigationWrapper } from "../chat/types/NavigationState";
import FrontendRoutes from "../../config/frontendRoutes";

export const createCardDateRow = (date: Date): UpcomingCardRowInfoProps => {
    const dateString = getDateString(date);

    return {
        icon: <CalendarToday />,
        text: dateString,
    };
};

export const createCardRequesterInfoRow = (
    requester: IRequester
): UpcomingCardRowInfoProps => {
    const name = truncateString(requester.firstName + " " + requester.lastName);

    return {
        icon: <PersonIcon />,
        text: name,
    };
};

export const createCardTimeRow = (date: Date): UpcomingCardRowInfoProps => {
    const timeString = getTimeString(date);

    return {
        icon: <Schedule />,
        text: timeString,
    };
};

export const createCardAppointmentModeRow = (
    mode: AppointmentModes
): UpcomingCardRowInfoProps => {
    return {
        icon: <Videocam />,
        text: AppointmentModes[mode],
    };
};

export const createCardLanguagesFooter = (
    languages: Languages[]
): UpcomingCardFooterProps => {
    const content = languages
        .slice(0, MAX_LANGUAGES_TO_SHOW_IN_CARD)
        .map((language) => {
            return (
                <Chip
                    key={language}
                    size="small"
                    color="primary"
                    label={language}
                />
            );
        });

    return {
        footerContent: content,
    };
};

export const createCardStateSideText = (
    state: RequestState
): UpcomingCardSideTextProps => {
    const matchedSideText: UpcomingCardSideTextProps = {
        color: PALETTE.SUCCESS_GREEN_DARK,
        text: IS_MATCHED_CARD_STRING,
    };

    const waitingSideText: UpcomingCardSideTextProps = {
        color: PALETTE.PENDING_RED,
        text: PENDING_MATCH_CARD_STRING,
    };

    const cancelledSideText: UpcomingCardSideTextProps = {
        color: PALETTE.CANCELLED_GREY,
        text: CANCELLED_MATCH_CARD_STRING,
    };

    switch (state) {
        case RequestState.MATCHED:
            return matchedSideText;
        case RequestState.CANCELLED:
            return cancelledSideText;
        case RequestState.PENDING:
        default:
            return waitingSideText;
    }
};

export const createCardChatChip = (
    history,
    targetGuid?: string
): JSX.Element => {
    return targetGuid ? (
        <div
            onClick={(e) => {
                const state: ChatStateNavigationWrapper = {
                    activeGuid: targetGuid,
                };
                history.push(FrontendRoutes.MESSAGES_ROUTE, state);
                e.stopPropagation();
            }}
        >
            <Chip
                size="small"
                label="Chat"
                clickable
                style={{
                    backgroundColor: "white",
                    color: PALETTE.PRIMARY_ALT,
                }}
                icon={<ChatIcon style={{ color: PALETTE.PRIMARY_ALT }} />}
            />
        </div>
    ) : (
        <div></div>
    );
};

export const createCardAccentColor = (state: RequestState): string => {
    switch (state) {
        case RequestState.MATCHED:
            return PALETTE.ACCENT_GREEN;
        case RequestState.CANCELLED:
            return PALETTE.CANCELLED_GREY;
        case RequestState.PENDING:
        default:
            return PALETTE.PENDING_RED;
    }
};
