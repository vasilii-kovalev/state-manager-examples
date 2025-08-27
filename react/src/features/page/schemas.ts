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
	GroupIdSchema,
	GroupSchema,
} from "../group/schemas";
import {
	WorklogIdSchema,
	WorklogSchema,
} from "../worklog/schemas";

const PageDataSchema = object({
	activities: array(ActivitySchema),
	calendar: array(CalendarDaySchema),
	groups: array(GroupSchema),
	worklogs: array(WorklogSchema),
});

const PageStateSchema = object({
	activitiesById: record(
		ActivityIdSchema,
		ActivitySchema,
	),
	activityIds: array(ActivityIdSchema),
	calendar: PageDataSchema.entries.calendar,
	groupIds: array(GroupIdSchema),
	groupsById: record(
		GroupIdSchema,
		GroupSchema,
	),
	selectedWorklogIds: array(WorklogIdSchema),
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
