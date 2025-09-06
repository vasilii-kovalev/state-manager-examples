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
	dateString: DateString,
): string => {
	const date = parseDate(dateString);

	return format(
		date,
		DATE_FORMAT.WEEKDAY_SHORT,
	);
};

export {
	formatWeekdayShort,
};
