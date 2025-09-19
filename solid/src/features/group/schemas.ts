import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
	trim,
} from "valibot";

const GroupIdSchema = pipe(
	string(),
	nonEmpty(),
	flavor("group-id"),
);

const GroupNameSchema = pipe(
	string(),
	nonEmpty(),
	trim(),
	flavor("group-name"),
);

const GroupSchema = object({
	id: GroupIdSchema,
	name: GroupNameSchema,
});

export {
	GroupIdSchema,
	GroupNameSchema,
	GroupSchema,
};
