import {
	type InferOutput,
} from "valibot";

import {
	type PageDataSchema,
} from "./schemas";

type PageData = InferOutput<typeof PageDataSchema>;

export {
	type PageData,
};
