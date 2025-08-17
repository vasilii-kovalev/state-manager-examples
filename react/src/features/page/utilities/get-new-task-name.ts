import {
	parse,
} from "valibot";

import {
	TaskNameSchema,
} from "@/features/task/schemas";
import {
	type TaskName,
} from "@/features/task/types";

import {
	generateUniqueName,
} from "./generate-unique-name";

const getNewTaskName = (
	existingNames: Array<TaskName>,
): TaskName => {
	const taskName = generateUniqueName({
		existingNames,
		namePrefix: "Task",
	});

	return parse(
		TaskNameSchema,
		taskName,
	);
};

export {
	getNewTaskName,
};
