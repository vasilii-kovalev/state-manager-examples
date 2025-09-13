import {
	type ActivityId,
} from "@/features/activity/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type Thunk,
} from "../store";
import {
	unselectWorklogs,
	updateStateFromTransaction,
} from "../store/page/slice";
import {
	moveWorklogToActivity,
} from "./move-worklog-to-activity";
import {
	performTransaction,
} from "./perform-transaction";

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

			// No need to move if worklog is already in the target activity.
			if (worklog.activityId === activityId) {
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

const moveWorklogsToActivityWithTransaction: typeof moveWorklogsToActivity = (
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
			dispatch(moveWorklogsToActivity(...params));
		},
	});
};

export {
	moveWorklogsToActivityWithTransaction as moveWorklogsToActivity,
};
