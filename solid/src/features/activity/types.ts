import {
	type InferOutput,
} from "valibot";

import {
	type ActivityIdSchema,
	type ActivityNameSchema,
	type ActivitySchema,
} from "./schemas";

type ActivityId = InferOutput<typeof ActivityIdSchema>;

type ActivityName = InferOutput<typeof ActivityNameSchema>;

type Activity = InferOutput<typeof ActivitySchema>;

export {
	type Activity,
	type ActivityId,
	type ActivityName,
};
