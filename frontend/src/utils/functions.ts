import * as QueryString from "query-string";

export const getOrdinalNum = (number) => {
    let selector;

    if (number <= 0) {
        selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
    } else {
        selector = number % 10;
    }

    return number + ["th", "st", "nd", "rd", ""][selector];
};

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const getDateString = (date: Date) => {
    const res: string[] = [];

    // Date in ordinal format
    res.push(getOrdinalNum(date.getDate()));

    // Month
    res.push(months[date.getMonth()]); // 0 -> January.

    // Year
    res.push("" + date.getFullYear());

    return res.join(" ");
};

export const getTimeString = (date: Date) => {
    return date
        .toTimeString()
        ?.split(" ")[0]
        ?.split(":")
        ?.slice(0, 2)
        .join(":");
};

export const getMonthAndYearKeyTimestamp = (
    date: Date
): { key: string; timestamp: number } => {
    const startDate = new Date(date);
    const key = [months[date.getMonth()], date.getFullYear()].join(" ");

    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    return {
        key,
        timestamp: startDate.getTime(),
    };
};

export const getTimeSinceString = (date: Date): string => {
    let seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const divisors = [31536000, 2592000, 86400, 3600, 60, 1];
    const description = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
    ];

    const result: string[] = [];

    let interval = seconds;

    for (let i = 0; i < divisors.length; ++i) {
        interval = Math.floor(seconds / divisors[i]);
        if (interval > 0) {
            // Remove 's' from text for cases like '1 day ago'
            const descriptionText =
                interval > 1 ? description[i] : description[i].slice(0, -1);
            result.push(`${interval} ${descriptionText} ago`);
            break;
        }
        seconds -= interval * divisors[i];
    }

    return result.join(" ");
};

export const cleanAllEmptyOrNullFieldsFromObject = (obj) => {
    Object.keys(obj).forEach(
        (k) => (obj[k] == null || obj[k] === "") && delete obj[k]
    );
};

export const encodeQueryParameters = (data) => {
    return Object.keys(data)
        .map(function (key) {
            return [key, data[key]].map(encodeURIComponent).join("=");
        })
        .join("&");
};

export const getParameterFromQueryString = (parameter: string, queryString: string): string | null => {
    const queries = QueryString.parse(queryString);
    return queries[`${parameter}`] as string ?? null;
}

export const truncateString = (text: string, maxChars = 20): string => {
    return text.substr(0, maxChars - 1) + (text.length > maxChars ? "..." : "");
};

export const toTitleCase = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
};
