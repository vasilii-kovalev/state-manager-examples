import {
	parse,
} from "valibot";

import {
	getNewTask,
} from "@/features/page/utilities/get-new-task";
import {
	getNewTaskName,
} from "@/features/page/utilities/get-new-task-name";
import {
	TaskSchema,
} from "@/features/task/schemas";

import {
	type Thunk,
} from "../store";
import {
	addTask as addTaskAction,
} from "../store/page/slice";
import {
	getTaskNames,
} from "./get-task-names";

const addTask = (): Thunk<void> => {
	return (dispatch) => {
		const existingNames = dispatch(getTaskNames());
		const name = getNewTaskName(existingNames);
		const task = parse(
			TaskSchema,
			getNewTask({
				name,
			}),
		);

		dispatch(addTaskAction(task));
	};
};

export {
	addTask,
};
