import {
	isDate,
} from "@/utilities/is-date";

import {
	type DateString,
} from "../types";
import {
	parseISO,
} from "./parse-iso";

const parseDate = (
	dateOrDateString: Date | DateString,
): Date => {
	if (isDate(dateOrDateString)) {
		return dateOrDateString;
	}

	return parseISO(dateOrDateString);
};

export {
	parseDate,
};
