import {
	boolean,
	exactOptional,
	object,
} from "valibot";

import {
	ActivitySchema,
} from "@/features/activity/schemas";
import {
	TaskSchema,
} from "@/features/task/schemas";

import {
	WorklogSchema,
} from "../features/worklog/schemas";

const IsChangedSchema = boolean();

const PageWorklogSchema = object({
	...WorklogSchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

const PageActivitySchema = object({
	...ActivitySchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

const PageTaskSchema = object({
	...TaskSchema.entries,
	isChanged: exactOptional(
		IsChangedSchema,
		false,
	),
});

export {
	PageActivitySchema,
	PageTaskSchema,
	PageWorklogSchema,
};
