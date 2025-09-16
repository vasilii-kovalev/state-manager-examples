// eslint-disable-next-line @typescript-eslint/no-restricted-imports
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
	dateOrDateString: Date | DateString,
): boolean => {
	const date = parseDate(dateOrDateString);

	return isWeekend(date);
};

export {
	getIsWeekend,
};
