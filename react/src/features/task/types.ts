import {
	type InferOutput,
} from "valibot";

import {
	type TaskIdSchema,
	type TaskNameSchema,
	type TaskSchema,
} from "./schemas";

type TaskId = InferOutput<typeof TaskIdSchema>;

type TaskName = InferOutput<typeof TaskNameSchema>;

type Task = InferOutput<typeof TaskSchema>;

export {
	type Task,
	type TaskId,
	type TaskName,
};
