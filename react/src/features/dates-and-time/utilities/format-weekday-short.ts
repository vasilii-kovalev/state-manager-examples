import {
	format,
} from "date-fns";

import {
	DATE_FORMAT,
} from "../constants";
import {
	type DateString,
} from "../types";
import {
	parseDate,
} from "./parse-date";

const formatWeekdayShort = (
	dateOrDateString: Date | DateString,
): string => {
	const date = parseDate(dateOrDateString);

	return format(
		date,
		DATE_FORMAT.WEEKDAY_SHORT,
	);
};

export {
	formatWeekdayShort,
};
