import {
	type Activity,
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type DateString,
} from "@/features/dates-and-time/types";
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
	cloneDeep,
} from "@/utilities/clone-deep";
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
 * Does not reuse existing actions and thunks.

 * The same as `moveWorklogsToGroupCloneDeep`, but uses `Map`-s instead of arrays
 * to optimize lookups of existing activities and worklogs on each iteration.
 */
const moveWorklogsToGroup = (
	groupId: GroupId,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const stateNextDraft = cloneDeep(getState().page);

		type ActivitiesMapValue = `${GroupId}-${ActivityName}`;

		const activitiesMap = stateNextDraft.activityIds.reduce<
			Map<
				ActivitiesMapValue,
				Activity
			>
		>(
			(
				activitiesMapCurrent,
				activityId,
			) => {
				const activity = stateNextDraft.activitiesById[activityId];

				if (!isUndefined(activity)) {
					activitiesMapCurrent.set(
						`${activity.groupId}-${activity.name}`,
						activity,
					);
				}

				return activitiesMapCurrent;
			},
			new Map<
				ActivitiesMapValue,
				Activity
			>(),
		);

		type WorklogsMapValue = `${ActivityId}-${DateString}`;

		const worklogsMap = stateNextDraft.worklogIds.reduce<
			Map<
				WorklogsMapValue,
				Worklog
			>
		>(
			(
				worklogsMapCurrent,
				worklogId,
			) => {
				const worklog = stateNextDraft.worklogsById[worklogId];

				if (!isUndefined(worklog)) {
					worklogsMapCurrent.set(
						`${worklog.activityId}-${worklog.date}`,
						worklog,
					);
				}

				return worklogsMapCurrent;
			},
			new Map<
				WorklogsMapValue,
				Worklog
			>(),
		);

		interface GetGroupNamesParams {
			activityIdToExclude?: ActivityId;
		}

		const getActivityNamesInGroup = (
			params: GetGroupNamesParams = {},
		): Array<ActivityName> => {
			const {
				activityIdToExclude,
			} = params;

			const activities = getEntities({
				byId: stateNextDraft.activitiesById,
				filter: (
					activity,
				) => {
					return (
						activity.groupId === groupId
						&& activity.id !== activityIdToExclude
					);
				},
				ids: stateNextDraft.activityIds,
			});

			return activities.map<ActivityName>((
				activity,
			) => {
				return activity.name;
			});
		};

		interface AddActivityParams {
			name?: ActivityName;
		}

		const addActivity = (
			params: AddActivityParams = {},
		): ActivityId => {
			const {
				name,
			} = params;

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

			activitiesMap.set(
				`${groupId}-${activity.name}`,
				activity,
			);

			return activity.id;
		};

		type MoveWorklogParams = Pick<
			Worklog,
			| "activityId"
			| "id"
		>;

		const moveWorklog = (
			params: MoveWorklogParams,
		): void => {
			const {
				activityId,
				id,
			} = params;

			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklogsMap.delete(
				`${worklog.activityId}-${worklog.date}`,
			);

			worklog.activityId = activityId;

			worklog.groupId = groupId;

			worklogsMap.set(
				`${activityId}-${worklog.date}`,
				worklog,
			);

			stateNextDraft.hasChanges = true;
		};

		type UpdateWorklogDurationParams = Pick<
			Worklog,
			| "duration"
			| "id"
		>;

		const updateWorklogDuration = (
			params: UpdateWorklogDurationParams,
		): void => {
			const {
				duration,
				id,
			} = params;

			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			worklog.duration = duration;

			worklogsMap.set(
				`${worklog.activityId}-${worklog.date}`,
				worklog,
			);

			stateNextDraft.hasChanges = true;
		};

		const removeWorklog = (
			worklogId: WorklogId,
		): void => {
			const worklog = stateNextDraft.worklogsById[worklogId];

			if (isUndefined(worklog)) {
				return;
			}

			worklogsMap.delete(
				`${worklog.activityId}-${worklog.date}`,
			);

			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete stateNextDraft.worklogsById[worklogId];

			stateNextDraft.worklogIds = stateNextDraft.worklogIds.filter((
				worklogIdCurrent,
			) => {
				return worklogIdCurrent !== worklogId;
			});

			stateNextDraft.hasChanges = true;
		};

		type MoveWorklogToActivityParams = Pick<
			Worklog,
			| "activityId"
			| "id"
		>;

		const moveWorklogToActivity = (
			params: MoveWorklogToActivityParams,
		): void => {
			const {
				activityId,
				id,
			} = params;

			const worklog = stateNextDraft.worklogsById[id];

			if (isUndefined(worklog)) {
				return;
			}

			const existingWorklog = worklogsMap.get(
				`${activityId}-${worklog.date}`,
			);

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

		stateNextDraft.selectedWorklogIds.forEach((
			worklogId,
		) => {
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

			const existingActivity = activitiesMap.get(
				`${groupId}-${activity.name}`,
			);

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
};

export {
	moveWorklogsToGroup as moveWorklogsToGroupCloneDeepWithMaps,
};
