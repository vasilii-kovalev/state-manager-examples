import {
	parse,
} from "valibot";

import {
	PageActivitySchema,
} from "@/features/page/schemas";
import {
	getNewActivity,
} from "@/features/page/utilities/get-new-activity";
import {
	getNewActivityName,
} from "@/features/page/utilities/get-new-activity-name";
import {
	type TaskId,
} from "@/features/task/types";

import {
	type Thunk,
} from "../store";
import {
	addActivity as addActivityAction,
} from "../store/page/slice";
import {
	getActivityNamesInTask,
} from "./get-activity-names-in-task";

const addActivity = (taskId: TaskId): Thunk<void> => {
	return (dispatch) => {
		const existingNames = dispatch(
			getActivityNamesInTask({
				taskId,
			}),
		);
		const name = getNewActivityName(existingNames);
		const activity = parse(
			PageActivitySchema,
			getNewActivity({
				name,
				taskId,
			}),
		);

		dispatch(addActivityAction(activity));
	};
};

export {
	addActivity,
};
