import {
	isUndefined,
} from "es-toolkit";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	type Thunk,
} from "../store";
import {
	unselectWorklogs,
} from "../store/page/slice";
import {
	moveWorklogToActivity,
} from "./move-worklog-to-activity";

const moveWorklogsToActivity = (
	activityId: ActivityId,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			activitiesById,
			selectedWorklogIds,
			worklogsById,
		} = getState().page;

		selectedWorklogIds.forEach((worklogId) => {
			const worklog = worklogsById[worklogId];

			if (isUndefined(worklog)) {
				return;
			}

			const activity = activitiesById[activityId];

			if (isUndefined(activity)) {
				return;
			}

			dispatch(
				moveWorklogToActivity({
					activityId: activity.id,
					groupId: activity.groupId,
					id: worklog.id,
				}),
			);
		});

		dispatch(unselectWorklogs());
	};
};

export {
	moveWorklogsToActivity,
};
