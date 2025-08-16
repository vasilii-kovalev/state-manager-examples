import {
	type InferOutput,
} from "valibot";

import {
	type WorklogIdSchema,
	type WorklogSchema,
} from "./schemas";

type WorklogId = InferOutput<typeof WorklogIdSchema>;

type Worklog = InferOutput<typeof WorklogSchema>;

export {
	type Worklog,
	type WorklogId,
};
