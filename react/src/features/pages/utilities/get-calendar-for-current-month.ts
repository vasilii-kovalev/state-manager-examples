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

const getCalendarForCurrentMonth = (): Array<CalendarDay> => {
	const today = new Date();
	const days = eachDayOfInterval({
		end: endOfMonth(today),
		start: startOfMonth(today),
	});

	try {
		return days.map<CalendarDay>((date) => {
			return parse(
				CalendarDaySchema,
				{
					date: formatDateString(date),
					norm: isWeekend(date)
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
	getCalendarForCurrentMonth,
};
