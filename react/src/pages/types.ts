import {
	type InferOutput,
} from "valibot";

import {
	type PageActivitySchema,
	type PageTaskSchema,
	type PageWorklogSchema,
} from "./schemas";

type PageWorklog = InferOutput<typeof PageWorklogSchema>;

type PageActivity = InferOutput<typeof PageActivitySchema>;

type PageTask = InferOutput<typeof PageTaskSchema>;

export {
	type PageActivity,
	type PageTask,
	type PageWorklog,
};
