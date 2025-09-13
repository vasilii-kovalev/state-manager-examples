import {
	parse,
} from "valibot";

import {
	CalendarDaySchema,
} from "@/features/calendar/schemas";
import {
	type CalendarDay,
} from "@/features/calendar/types";
import {
	formatDateString,
} from "@/features/dates-and-time/utilities/format-date-string";
import {
	getEachDayOfInterval,
} from "@/features/dates-and-time/utilities/get-each-day-of-interval";
import {
	getEndOfMonth,
} from "@/features/dates-and-time/utilities/get-end-of-month";
import {
	getIsWeekend,
} from "@/features/dates-and-time/utilities/get-is-weekend";
import {
	getStartOfMonth,
} from "@/features/dates-and-time/utilities/get-start-of-month";

const getCalendarForMonth = (
	date: Date,
): Array<CalendarDay> => {
	const days = getEachDayOfInterval({
		end: getEndOfMonth(date),
		start: getStartOfMonth(date),
	});

	try {
		return days.map<CalendarDay>((dateCurrent) => {
			return parse(
				CalendarDaySchema,
				{
					date: formatDateString(dateCurrent),
					norm: getIsWeekend(dateCurrent)
						? 0
						: 8,
				} satisfies CalendarDay,
			);
		});
	} catch (error) {
		console.error(error);

		return [];
	}
};

export {
	getCalendarForMonth,
};
