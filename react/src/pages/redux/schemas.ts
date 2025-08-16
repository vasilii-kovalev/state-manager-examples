import {
	array,
	exactOptional,
	object,
	record,
} from "valibot";

import {
	ActivityIdSchema,
} from "@/features/activity/schemas";
import {
	PageDataSchema,
} from "@/features/page/schemas";
import {
	TaskIdSchema,
} from "@/features/task/schemas";
import {
	WorklogIdSchema,
} from "@/features/worklog/schemas";
import {
	PageActivitySchema,
	PageTaskSchema,
	PageWorklogSchema,
} from "@/pages/schemas";

const PageStateSchema = object({
	...PageDataSchema.entries,
	activitiesById: record(
		ActivityIdSchema,
		PageActivitySchema,
	),
	selectedWorklogIds: exactOptional(
		array(WorklogIdSchema),
		[],
	),
	tasksById: record(
		TaskIdSchema,
		PageTaskSchema,
	),
	worklogsById: record(
		WorklogIdSchema,
		PageWorklogSchema,
	),
});

export {
	PageStateSchema,
};
