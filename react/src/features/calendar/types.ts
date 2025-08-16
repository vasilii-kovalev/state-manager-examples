import {
	type InferOutput,
} from "valibot";

import {
	type CalendarDaySchema,
} from "./schemas";

type CalendarDay = InferOutput<typeof CalendarDaySchema>;

export {
	type CalendarDay,
};
