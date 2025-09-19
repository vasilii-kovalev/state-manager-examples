import {
	type InferOutput,
} from "valibot";

import {
	type DateStringSchema,
	type DurationSchema,
} from "./schemas";

type DateString = InferOutput<typeof DateStringSchema>;

type Duration = InferOutput<typeof DurationSchema>;

export {
	type DateString,
	type Duration,
};
