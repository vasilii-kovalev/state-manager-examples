import { array, boolean, check, object, parseJson, pipe, record, string } from "valibot";

import { ActivityIdSchema, ActivitySchema } from "../activity/schemas";
import { CalendarDaySchema } from "../calendar/schemas";
import { GroupIdSchema, GroupSchema } from "../group/schemas";
import { WorklogIdSchema, WorklogSchema } from "../worklog/schemas";

const PageDataSchema = object({
	activities: array(ActivitySchema),
	calendar: array(CalendarDaySchema),
	groups: array(GroupSchema),
	worklogs: array(WorklogSchema),
});

const PageDataStringifiedSchema = pipe(string(), parseJson(), PageDataSchema);

const PageStateSchema = object({
	activitiesById: record(ActivityIdSchema, ActivitySchema),
	activityIds: array(ActivityIdSchema),
	calendar: PageDataSchema.entries.calendar,
	groupIds: array(GroupIdSchema),
	groupsById: record(GroupIdSchema, GroupSchema),
	hasChanges: boolean(),
	selectedWorklogIds: array(WorklogIdSchema),
	worklogIds: array(WorklogIdSchema),
	worklogsById: record(WorklogIdSchema, WorklogSchema),
});

// Floating point number with optional decimal part containing up to 2 digits.
const WORKLOG_INPUT_REGEXP = /^\d+(?<decimal>\.\d{0,2})?$/u;

const WorklogInputSchema = pipe(
	string(),
	check((value) => {
		if (value === "") {
			return true;
		}

		return WORKLOG_INPUT_REGEXP.test(value);
	}, "Invalid worklog duration format"),
);

export { PageDataSchema, PageDataStringifiedSchema, PageStateSchema, WorklogInputSchema };
