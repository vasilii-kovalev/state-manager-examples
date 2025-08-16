import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
} from "valibot";

import {
	TaskIdSchema,
} from "../task/schemas";

const ActivityIdSchema = pipe(
	string(),
	nonEmpty(),
	flavor("activity-id"),
);

const ActivityNameSchema = pipe(
	string(),
	nonEmpty(),
	flavor("activity-name"),
);

const ActivitySchema = object({
	id: ActivityIdSchema,
	name: ActivityNameSchema,
	taskId: TaskIdSchema,
});

export {
	ActivityIdSchema,
	ActivitySchema,
};
