import moment from "moment";
import { dateFormat } from "../config/properties";

const checkDate = (value) => {
	return moment(value, dateFormat).isValid();
};

const checkIfValidFutureDate = (value) => {
	if (checkDate(value)) {
		// return moment(value, "YYYY-MM-DD").isSameOrAfter(moment.utc().toNow());
		return true;
	}
};

const checkIfDateFiltersValid = (from?, to?) => {
	if (from && to) {
		return checkDate(from) && moment(from).isSameOrBefore(to);
	} else if (from) {
		return checkDate(from);
	} else if (to) {
		return checkDate(to);
	}

	return true;
};

const generateMongooseDateFilters = (
	fromDateString: string,
	toDateString: string,
	dateFieldToQuery: string = "createdAt"
) => {
	// Convert to Mongoose ISO format first.
	if (!fromDateString || fromDateString === "" || fromDateString === undefined) {
		fromDateString = null;
	}

	if (!toDateString || toDateString === "" || toDateString === undefined) {
		toDateString = null;
	}

	let fromDate = null;
	let toDate = null;

	if (dateFieldToQuery === "createdAt") {
		// mongoose requires different way
		fromDate = fromDateString ? new Date(moment(fromDateString, dateFormat).startOf("day").toDate()) : null;
		toDate = toDateString ? new Date(moment(toDateString, dateFormat).endOf("day").toDate()) : null;
	} else {
		fromDate = fromDateString ? new Date(moment(fromDateString, dateFormat).startOf("day").format()) : null;
		toDate = toDateString ? new Date(moment(toDateString, dateFormat).endOf("day").format()) : null;
	}

	if (fromDate && toDate) {
		return {
			[dateFieldToQuery]: {
				$gte: fromDate,
				$lte: toDate,
			},
		};
	} else if (fromDate) {
		return {
			[dateFieldToQuery]: {
				$gte: fromDate,
			},
		};
	} else if (toDate) {
		return {
			[dateFieldToQuery]: {
				$lte: toDate,
			},
		};
	} else {
		return {};
	}
};

export { checkDate, checkIfValidFutureDate, checkIfDateFiltersValid, generateMongooseDateFilters };
