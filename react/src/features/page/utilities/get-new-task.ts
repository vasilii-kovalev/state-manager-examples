import {
	nanoid,
} from "nanoid";

import {
	type Task,
} from "@/features/task/types";

const getNewTask = (
	override?: Partial<Task>,
): Task => {
	return {
		id: nanoid(),
		name: "",
		...override,
	};
};

export {
	getNewTask,
};
