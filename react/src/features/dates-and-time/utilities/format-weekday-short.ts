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

const formatWeekdayShort = (
	dateString: DateString,
): string => {
	const date = parseDate(dateString);

	return formatDate(
		date,
		DATE_FORMAT.WEEKDAY_SHORT,
	);
};

export {
	formatWeekdayShort,
};
