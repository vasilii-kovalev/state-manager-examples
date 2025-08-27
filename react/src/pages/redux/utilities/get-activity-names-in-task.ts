import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	type TaskId,
} from "@/features/task/types";

import {
	type Thunk,
} from "../store";

interface GetTaskNamesParams {
	taskId: TaskId;
	activityIdToExclude?: ActivityId;
}

/*
	Can't use `selectActivityNamesInTask` selector, because the result will be memoized,
	which is undesirable in this case.
*/
const getActivityNamesInTask = ({
	taskId,
	activityIdToExclude,
}: GetTaskNamesParams): Thunk<Array<ActivityName>> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			activityIds,
			activitiesById,
		} = getState().page;

		const activities = getEntities({
			byId: activitiesById,
			filter: (activity) => {
				return (
					activity.taskId === taskId
					&& activity.id !== activityIdToExclude
				);
			},
			ids: activityIds,
		});

		return activities.map<ActivityName>((activity) => {
			return activity.name;
		});
	};
};

export {
	getActivityNamesInTask,
};
