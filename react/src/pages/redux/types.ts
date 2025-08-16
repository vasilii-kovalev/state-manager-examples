import {
	type InferOutput,
} from "valibot";

import {
	type PageStateSchema,
} from "./schemas";

type PageState = InferOutput<typeof PageStateSchema>;

export {
	type PageState,
};
