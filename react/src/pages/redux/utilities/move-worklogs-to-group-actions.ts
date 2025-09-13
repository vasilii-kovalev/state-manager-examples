import {
	type GroupId,
} from "@/features/group/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

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

			// The state may update in the loop, so we need to access the latest one on each iteration.
			const {
				activitiesById,
			} = getState().page;

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

/**
 * Reuses the existing actions and thunks.

 * Uses `performTransaction` to collect patches and update the state once, avoiding unnecessary re-renders.
 * The thunk accepts "fake" `dispatch` and `getState` passed from `performTransaction.transaction`,
 * and all the dispatched actions update a draft state inside `performTransaction` instead of the "real" one.
 * Each dispatched action is mapped to an appropriate "real" reducer (which uses Immer under the hood).

 * Once the work is finished, `updateStateFromTransaction` action is dispatched with a "real" `dispatch`
 * to update the "real" state.
 */
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
	moveWorklogsToGroupWithTransaction as moveWorklogsToGroupActions,
};
