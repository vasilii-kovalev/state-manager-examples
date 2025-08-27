import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	type TaskId,
	type TaskName,
} from "@/features/task/types";

import {
	type Thunk,
} from "../store";

interface GetTaskNamesParams {
	taskIdToExclude?: TaskId;
}

/*
	Can't use `selectTaskNames` selector, because the result will be memoized,
	which is undesirable in this case.
*/
const getTaskNames = ({
	taskIdToExclude,
}: GetTaskNamesParams = {}): Thunk<Array<TaskName>> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			taskIds,
			tasksById,
		} = getState().page;

		const tasks = getEntities({
			byId: tasksById,
			filter: (task) => {
				return task.id !== taskIdToExclude;
			},
			ids: taskIds,
		});

		return tasks.map<TaskName>((task) => {
			return task.name;
		});
	};
};

export {
	getTaskNames,
};
