import {
	DATE_FORMAT,
} from "../constants";
import {
	type DateString,
} from "../types";
import {
	formatDate,
} from "./format-date";
import {
	parseDate,
} from "./parse-date";

const formatDayWithLeadingZero = (
	dateString: DateString,
): string => {
	const date = parseDate(dateString);

	return formatDate(
		date,
		DATE_FORMAT.DAY_WITH_LEADING_ZERO,
	);
};

export {
	formatDayWithLeadingZero,
};
