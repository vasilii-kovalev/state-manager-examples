import { parse } from "valibot";

import { CalendarDaySchema } from "../../calendar/schemas";
import { type CalendarDay } from "../../calendar/types";
import { WORKING_DAY_NORM_HOURS } from "../../dates-and-time/constants";
import { formatDateString } from "../../dates-and-time/utilities/format-date-string";
import { getEachDayOfInterval } from "../../dates-and-time/utilities/get-each-day-of-interval";
import { getEndOfMonth } from "../../dates-and-time/utilities/get-end-of-month";
import { getIsWeekend } from "../../dates-and-time/utilities/get-is-weekend";
import { getStartOfMonth } from "../../dates-and-time/utilities/get-start-of-month";

const getCalendarForMonth = (date: Date): Array<CalendarDay> => {
	const days = getEachDayOfInterval({
		end: getEndOfMonth(date),
		start: getStartOfMonth(date),
	});

	try {
		return days.map<CalendarDay>((dateCurrent) => {
			return parse(CalendarDaySchema, {
				date: formatDateString(dateCurrent),
				norm: getIsWeekend(dateCurrent) ? 0 : WORKING_DAY_NORM_HOURS,
			} satisfies CalendarDay);
		});
	} catch (error) {
		console.error(error);

		return [];
	}
};

export { getCalendarForMonth };
