import {
	create,
} from "mutative";

import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";
import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";
import {
	getNewActivity,
} from "@/features/page/utilities/get-new-activity";
import {
	getNewActivityName,
} from "@/features/page/utilities/get-new-activity-name";
import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	type Thunk,
} from "../store";
import {
	updateStateFromTransaction,
} from "../store/page/slice";

/**
 * Does not reuse existing actions and thunks. Instead, it copies their functionality.

 * Uses Mutative library to create a draft state from the existing one, which allows mutating it directly.

 * Once the work is finished, `updateStateFromTransaction` action is dispatched with the updated state.
 */
const moveWorklogsToGroup = (
	groupId: GroupId,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const stateNext = create(
			getState().page,
			(stateNextDraft) => {
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

					// eslint-disable-next-line no-param-reassign
					stateNextDraft.activitiesById[activity.id] = activity;

					stateNextDraft.activityIds.unshift(activity.id);

					// eslint-disable-next-line no-param-reassign
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

					// eslint-disable-next-line no-param-reassign
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

					// eslint-disable-next-line no-param-reassign
					stateNextDraft.hasChanges = true;
				};

				const removeWorklog = (
					worklogId: WorklogId,
				): void => {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete, no-param-reassign
					delete stateNextDraft.worklogsById[worklogId];

					// eslint-disable-next-line no-param-reassign
					stateNextDraft.worklogIds = stateNextDraft.worklogIds.filter((worklogIdCurrent) => {
						return worklogIdCurrent !== worklogId;
					});

					// eslint-disable-next-line no-param-reassign
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
					// eslint-disable-next-line no-param-reassign
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
			},
		);

		dispatch(updateStateFromTransaction(stateNext));
	};
};

export {
	moveWorklogsToGroup as moveWorklogsToGroupMutative,
};
