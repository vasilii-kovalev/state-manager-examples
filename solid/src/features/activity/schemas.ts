import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
	trim,
} from "valibot";

import {
	GroupIdSchema,
} from "../group/schemas";

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
	groupId: GroupIdSchema,
	id: ActivityIdSchema,
	name: ActivityNameSchema,
});

export {
	ActivityIdSchema,
	ActivityNameSchema,
	ActivitySchema,
};
