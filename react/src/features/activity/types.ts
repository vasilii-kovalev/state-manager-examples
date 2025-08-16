import {
	type InferOutput,
} from "valibot";

import {
	type ActivityIdSchema,
	type ActivitySchema,
} from "./schemas";

type ActivityId = InferOutput<typeof ActivityIdSchema>;

type Activity = InferOutput<typeof ActivitySchema>;

export {
	type Activity,
	type ActivityId,
};
