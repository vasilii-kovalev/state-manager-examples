import {
	isWeekend,
} from "date-fns";

import {
	type DateString,
} from "../types";
import {
	parseDate,
} from "./parse-date";

const getIsWeekend = (
	dateString: DateString,
): boolean => {
	const date = parseDate(dateString);

	return isWeekend(date);
};

export {
	getIsWeekend,
};
