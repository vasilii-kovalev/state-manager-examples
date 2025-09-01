import {
	isUndefined,
} from "es-toolkit";

import {
	type GroupId,
} from "@/features/group/types";

import {
	type Thunk,
} from "../store";
import {
	moveWorklog,
	unselectWorklogs,
	updateStateFromTransaction,
} from "../store/page/slice";
import {
	addActivity,
} from "./add-activity";
import {
	moveWorklogToActivity,
} from "./move-worklog-to-activity";
import {
	performTransaction,
} from "./perform-transaction";

const moveWorklogsToGroup = (
	groupId: GroupId,
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

			// No need to move if worklog is already in the target group.
			if (worklog.groupId === groupId) {
				return;
			}

			const activity = activitiesById[worklog.activityId];

			if (isUndefined(activity)) {
				return;
			}

			const activities = Object.values(activitiesById);

			const existingActivity = activities.find((activityCurrent) => {
				return (
					activityCurrent.groupId === groupId
					&& activityCurrent.name === activity.name
				);
			});

			if (isUndefined(existingActivity)) {
				const activityId = dispatch(
					addActivity({
						groupId,
						name: activity.name,
					}),
				);

				dispatch(
					moveWorklog({
						activityId,
						groupId,
						id: worklog.id,
					}),
				);
			} else {
				dispatch(
					moveWorklogToActivity({
						activityId: existingActivity.id,
						groupId: existingActivity.groupId,
						id: worklog.id,
					}),
				);
			}
		});

		dispatch(unselectWorklogs());
	};
};

const moveWorklogsToGroupWithTransaction: typeof moveWorklogsToGroup = (
	...params
) => {
	return performTransaction({
		onFinish: (
			dispatch,
			getState,
		) => {
			const pageStateNext = getState().page;

			dispatch(updateStateFromTransaction(pageStateNext));
		},
		transaction: (
			dispatch,
		) => {
			dispatch(moveWorklogsToGroup(...params));
		},
	});
};

export {
	moveWorklogsToGroupWithTransaction as moveWorklogsToGroup,
};
