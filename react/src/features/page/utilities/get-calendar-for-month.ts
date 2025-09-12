import {
	eachDayOfInterval,
	endOfMonth,
	isWeekend,
	startOfMonth,
} from "date-fns";
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

const getCalendarForMonth = (
	date: Date,
): Array<CalendarDay> => {
	const days = eachDayOfInterval({
		end: endOfMonth(date),
		start: startOfMonth(date),
	});

	try {
		return days.map<CalendarDay>((dateCurrent) => {
			return parse(
				CalendarDaySchema,
				{
					date: formatDateString(dateCurrent),
					norm: isWeekend(dateCurrent)
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
