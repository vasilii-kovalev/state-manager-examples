import {
	parseISO,
} from "date-fns";
import {
	isDate,
} from "es-toolkit";

import {
	type DateString,
} from "../types";

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
