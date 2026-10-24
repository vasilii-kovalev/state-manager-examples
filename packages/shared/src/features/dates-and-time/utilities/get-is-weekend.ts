// This module is the wrapper. Callers import it, and only it imports the library.
// oxlint-disable-next-line eslint/no-restricted-imports
import { isWeekend } from "date-fns";

import { type DateString } from "../types";
import { parseDate } from "./parse-date";

const getIsWeekend = (dateOrDateString: Date | DateString): boolean => {
	const date = parseDate(dateOrDateString);

	return isWeekend(date);
};

export { getIsWeekend };
