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

const formatDayWithLeadingZero = (
	dateOrDateString: Date | DateString,
): string => {
	const date = parseDate(dateOrDateString);

	return format(
		date,
		DATE_FORMAT.DAY_WITH_LEADING_ZERO,
	);
};

export {
	formatDayWithLeadingZero,
};
