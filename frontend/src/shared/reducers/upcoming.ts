import { Action } from "./common";

export const initialDateRangeState: IDateRangeState = {
    startDate: null,
    endDate: null,
};

export interface IDateRangeState {
    startDate: Date | null;
    endDate: Date | null;
}

const START_DATE_SELECTED = "START_SELECTED";
const START_DATE_CLEARED = "START_CLEARED";
const END_DATE_SELECTED = "END_SELECTED";
const END_DATE_CLEARED = "END_CLEARED";

export interface SELECT_DATE_ACTION extends Action {
    payload: Date | null;
}

export type CLEAR_DATE_ACTION = Action

export const upcomingReducer = (state: IDateRangeState, action: Action) => {
    const { type } = action;

    switch (type) {
        case START_DATE_SELECTED:
            return {
                ...state,
                startDate: (action as SELECT_DATE_ACTION).payload,
            };
        case START_DATE_CLEARED:
            return { ...state, startDate: null };
        case END_DATE_SELECTED:
            return {
                ...state,
                endDate: (action as SELECT_DATE_ACTION).payload,
            };
        case END_DATE_CLEARED:
            return { ...state, endDate: null };
        default:
            throw new Error();
    }
};

export {
    START_DATE_SELECTED,
    START_DATE_CLEARED,
    END_DATE_CLEARED,
    END_DATE_SELECTED,
};
