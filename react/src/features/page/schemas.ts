import {
	array,
	object,
	record,
} from "valibot";

import {
	ActivityIdSchema,
	ActivitySchema,
} from "../activity/schemas";
import {
	CalendarDaySchema,
} from "../calendar/schemas";
import {
	TaskIdSchema,
	TaskSchema,
} from "../task/schemas";
import {
	WorklogIdSchema,
	WorklogSchema,
} from "../worklog/schemas";

const PageDataSchema = object({
	activitiesById: record(
		ActivityIdSchema,
		ActivitySchema,
	),
	calendar: array(CalendarDaySchema),
	tasksById: record(
		TaskIdSchema,
		TaskSchema,
	),
	worklogsById: record(
		WorklogIdSchema,
		WorklogSchema,
	),
});

export {
	PageDataSchema,
};
