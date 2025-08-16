import {
	type InferOutput,
} from "valibot";

import {
	type TaskIdSchema,
	type TaskSchema,
} from "./schemas";

type TaskId = InferOutput<typeof TaskIdSchema>;

type Task = InferOutput<typeof TaskSchema>;

export {
	type Task,
	type TaskId,
};
