/* eslint-disable capitalized-comments */
import {
	// cloneDeep,
	isUndefined,
} from "es-toolkit";

/* import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types"; */
import {
	type GroupId,
} from "@/features/group/types";

/* import {
	PAGE_STATE_DEFAULT,
} from "@/features/pages/constants";
import {
	getEntities,
} from "@/features/pages/utilities/get-entities";
import {
	getNewActivity,
} from "@/features/pages/utilities/get-new-activity";
import {
	getNewActivityName,
} from "@/features/pages/utilities/get-new-activity-name";
import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types"; */
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

// This version is much faster. probably because of the performance issue in Immer.
// More info: https://github.com/reduxjs/redux-toolkit/issues/4793
// TODO: check performance after Immer's performance in Redux Toolkit is improved.
/* const moveWorklogsToGroupCloneDeep = (
	groupId: GroupId,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const stateNextDraft = cloneDeep(getState().page);

		interface GetGroupNamesParams {
			activityIdToExclude?: ActivityId;
		}

		const getActivityNamesInGroup = ({
			activityIdToExclude,
		}: GetGroupNamesParams = {}): Array<ActivityName> => {
			const activities = getEntities({
				byId: stateNextDraft.activitiesById,
				filter: (activity) => {
					return (
						activity.groupId === groupId
						&& activity.id !== activityIdToExclude
					);
				},
				ids: stateNextDraft.activityIds,
			});

			return activities.map<ActivityName>((activity) => {
				return activity.name;
			});
		};

		interface AddActivityParams {
			name?: ActivityName;
		}

		const addActivity = ({
			name,
		}: AddActivityParams = {}): ActivityId => {
			let activityName = name;

			if (isUndefined(activityName)) {
				const existingNames = getActivityNamesInGroup();

				activityName = getNewActivityName(existingNames);
			}

			const activity = getNewActivity({
				groupId,
				name: activityName,
			});

			stateNextDraft.activitiesById[activity.id] = activity;

			stateNextDraft.activityIds.unshift(activity.id);

			stateNextDraft.hasChanges = true;

			return activity.id;
		};

		type MoveWorklogParams = Pick<
			Worklog,
			| "activityId"
			| "id"
		>;

		const moveWorklog = ({
			activityId,
			id,
		}: MoveWorklogParams): void => {
			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklog.activityId = activityId;

			worklog.groupId = groupId;

			stateNextDraft.hasChanges = true;
		};

		type UpdateWorklogDurationParams = Pick<
			Worklog,
			| "duration"
			| "id"
		>;

		const updateWorklogDuration = ({
			duration,
			id,
		}: UpdateWorklogDurationParams): void => {
			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklog.duration = duration;

			stateNextDraft.hasChanges = true;
		};

		const removeWorklog = (
			worklogId: WorklogId,
		): void => {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete stateNextDraft.worklogsById[worklogId];

			stateNextDraft.worklogIds = stateNextDraft.worklogIds.filter((worklogIdCurrent) => {
				return worklogIdCurrent !== worklogId;
			});

			stateNextDraft.hasChanges = true;
		};

		type MoveWorklogToActivityParams = Pick<
			Worklog,
			| "activityId"
			| "id"
		>;

		const moveWorklogToActivity = ({
			activityId,
			id,
		}: MoveWorklogToActivityParams): void => {
			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			const worklogs = Object.values(stateNextDraft.worklogsById);
			const existingWorklog = worklogs.find((worklogCurrent) => {
				return (
					worklogCurrent.activityId === activityId
					&& worklogCurrent.date === worklog.date
				);
			});

			if (isUndefined(existingWorklog)) {
				moveWorklog({
					activityId,
					id: worklog.id,
				});
			} else {
				updateWorklogDuration({
					duration: existingWorklog.duration + worklog.duration,
					id: existingWorklog.id,
				});

				removeWorklog(worklog.id);
			}
		};

		const unselectWorklogs = (): void => {
			stateNextDraft.selectedWorklogIds = PAGE_STATE_DEFAULT.selectedWorklogIds;
		};

		stateNextDraft.selectedWorklogIds.forEach((worklogId) => {
			const worklog = stateNextDraft.worklogsById[worklogId];

			if (isUndefined(worklog)) {
				return;
			}

			// No need to move if worklog is already in the target group.
			if (worklog.groupId === groupId) {
				return;
			}

			const activity = stateNextDraft.activitiesById[worklog.activityId];

			if (isUndefined(activity)) {
				return;
			}

			const activities = Object.values(stateNextDraft.activitiesById);

			const existingActivity = activities.find((activityCurrent) => {
				return (
					activityCurrent.groupId === groupId
					&& activityCurrent.name === activity.name
				);
			});

			if (isUndefined(existingActivity)) {
				const activityId = addActivity({
					name: activity.name,
				});

				moveWorklog({
					activityId,
					id: worklog.id,
				});
			} else {
				moveWorklogToActivity({
					activityId: existingActivity.id,
					id: worklog.id,
				});
			}
		});

		unselectWorklogs();

		dispatch(updateStateFromTransaction(stateNextDraft));
	};
}; */

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
