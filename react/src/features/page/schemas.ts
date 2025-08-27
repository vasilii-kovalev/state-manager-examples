import {
	array,
	exactOptional,
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
	activities: array(ActivitySchema),
	calendar: array(CalendarDaySchema),
	tasks: array(TaskSchema),
	worklogs: array(WorklogSchema),
});

const PageStateSchema = object({
	activitiesById: record(
		ActivityIdSchema,
		ActivitySchema,
	),
	activityIds: array(ActivityIdSchema),
	calendar: PageDataSchema.entries.calendar,
	selectedWorklogIds: exactOptional(
		array(WorklogIdSchema),
		[],
	),
	taskIds: array(TaskIdSchema),
	tasksById: record(
		TaskIdSchema,
		TaskSchema,
	),
	worklogIds: array(WorklogIdSchema),
	worklogsById: record(
		WorklogIdSchema,
		WorklogSchema,
	),
});

export {
	PageDataSchema,
	PageStateSchema,
};
