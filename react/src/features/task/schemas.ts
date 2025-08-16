import {
	flavor,
	nonEmpty,
	object,
	pipe,
	string,
} from "valibot";

const TaskIdSchema = pipe(
	string(),
	nonEmpty(),
	flavor("task-id"),
);

const TaskNameSchema = pipe(
	string(),
	nonEmpty(),
	flavor("activity-name"),
);

const TaskSchema = object({
	id: TaskIdSchema,
	name: TaskNameSchema,
});

export {
	TaskIdSchema,
	TaskSchema,
};
