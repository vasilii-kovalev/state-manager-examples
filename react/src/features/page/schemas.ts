import {
	array,
	boolean,
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

const IsChangedSchema = boolean();

const PageWorklogSchema = object({
	...WorklogSchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

const PageActivitySchema = object({
	...ActivitySchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

const PageTaskSchema = object({
	...TaskSchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

const PageStateSchema = object({
	activitiesById: record(
		ActivityIdSchema,
		PageActivitySchema,
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
		PageTaskSchema,
	),
	worklogIds: array(WorklogIdSchema),
	worklogsById: record(
		WorklogIdSchema,
		PageWorklogSchema,
	),
});

export {
	PageActivitySchema,
	PageDataSchema,
	PageStateSchema,
	PageTaskSchema,
	PageWorklogSchema,
};
