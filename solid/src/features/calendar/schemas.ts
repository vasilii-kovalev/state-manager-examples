import {
	object,
} from "valibot";

import {
	DateStringSchema,
	DurationSchema,
} from "../dates-and-time/schemas";

const CalendarDaySchema = object({
	date: DateStringSchema,
	norm: DurationSchema,
});

export {
	CalendarDaySchema,
};
