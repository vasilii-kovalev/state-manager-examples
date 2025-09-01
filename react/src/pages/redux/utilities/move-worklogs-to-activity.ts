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
	moveWorklog,
	removeWorklog,
	unselectWorklogs,
	updateWorklogDuration,
} from "../store/page/slice";

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

			const worklogs = Object.values(worklogsById);
			const existingWorklog = worklogs.find((worklogCurrent) => {
				return (
					worklogCurrent.activityId === activity.id
					&& worklogCurrent.date === worklog.date
				);
			});

			if (isUndefined(existingWorklog)) {
				dispatch(
					moveWorklog({
						activityId: activity.id,
						groupId: activity.groupId,
						id: worklog.id,
					}),
				);
			} else {
				dispatch(
					updateWorklogDuration({
						duration: existingWorklog.duration + worklog.duration,
						id: existingWorklog.id,
					}),
				);

				dispatch(removeWorklog(worklog.id));
			}
		});

		dispatch(unselectWorklogs());
	};
};

export {
	moveWorklogsToActivity,
};
