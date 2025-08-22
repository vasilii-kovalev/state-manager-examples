import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
	trim,
} from "valibot";

const TaskIdSchema = pipe(
	string(),
	nonEmpty(),
	flavor("task-id"),
);

const TaskNameSchema = pipe(
	string(),
	nonEmpty(),
	trim(),
	flavor("activity-name"),
);

const TaskSchema = object({
	id: TaskIdSchema,
	name: TaskNameSchema,
});

export {
	TaskIdSchema,
	TaskNameSchema,
	TaskSchema,
};
