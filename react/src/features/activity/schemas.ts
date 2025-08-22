import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
	trim,
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
	trim(),
	flavor("activity-name"),
);

const ActivitySchema = object({
	id: ActivityIdSchema,
	name: ActivityNameSchema,
	taskId: TaskIdSchema,
});

export {
	ActivityIdSchema,
	ActivityNameSchema,
	ActivitySchema,
};
