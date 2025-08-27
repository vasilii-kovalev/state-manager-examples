import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
} from "valibot";

import {
	ActivityIdSchema,
} from "../activity/schemas";
import {
	DateStringSchema,
	DurationSchema,
} from "../dates-and-time/schemas";
import {
	GroupIdSchema,
} from "../group/schemas";

const WorklogIdSchema = pipe(
	string(),
	nonEmpty(),
	flavor("worklog-id"),
);

const WorklogSchema = object({
	activityId: ActivityIdSchema,
	date: DateStringSchema,
	duration: DurationSchema,
	groupId: GroupIdSchema,
	id: WorklogIdSchema,
});

export {
	WorklogIdSchema,
	WorklogSchema,
};
