import {
	type InferOutput,
} from "valibot";

import {
	type GroupIdSchema,
	type GroupNameSchema,
	type GroupSchema,
} from "./schemas";

type GroupId = InferOutput<typeof GroupIdSchema>;

type GroupName = InferOutput<typeof GroupNameSchema>;

type Group = InferOutput<typeof GroupSchema>;

export {
	type Group,
	type GroupId,
	type GroupName,
};
