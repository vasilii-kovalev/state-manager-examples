import {
	eachDayOfInterval,
	endOfMonth,
	formatISO,
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

const getCalendarForCurrentMonth = (): Array<CalendarDay> => {
	const today = new Date();
	const days = eachDayOfInterval({
		end: endOfMonth(today),
		start: startOfMonth(today),
	});

	try {
		return days.map<CalendarDay>((date) => {
			const dateString = formatISO(
				date,
				{
					representation: "date",
				},
			);

			return parse(
				CalendarDaySchema,
				{
					date: dateString,
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
