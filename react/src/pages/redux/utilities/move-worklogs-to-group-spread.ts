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

 * Does not use any immutability library, so the draft state is updated by copying structures
 * using JavaScript spread operator.

 * Once the work is finished, `updateStateFromTransaction` action is dispatched with the updated state.
 */
const moveWorklogsToGroup = (
	groupId: GroupId,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		let stateNextDraft = getState().page;

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

			const activitiesByIdNext: typeof stateNextDraft.activitiesById = {
				...stateNextDraft.activitiesById,
			};

			activitiesByIdNext[activity.id] = activity;

			const activityIdsNext: typeof stateNextDraft.activityIds = [
				...stateNextDraft.activityIds,
			];

			activityIdsNext.unshift(activity.id);

			stateNextDraft = {
				...stateNextDraft,
				activitiesById: activitiesByIdNext,
				activityIds: activityIdsNext,
				hasChanges: true,
			};

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

			const worklogNext: Worklog = {
				...worklog,
			};

			worklogNext.activityId = activityId;

			worklogNext.groupId = groupId;

			const worklogsByIdNext: typeof stateNextDraft.worklogsById = {
				...stateNextDraft.worklogsById,
			};

			worklogsByIdNext[id] = worklogNext;

			stateNextDraft = {
				...stateNextDraft,
				hasChanges: true,
				worklogsById: worklogsByIdNext,
			};
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

			const worklogNext: Worklog = {
				...worklog,
			};

			worklogNext.duration = duration;

			const worklogsByIdNext: typeof stateNextDraft.worklogsById = {
				...stateNextDraft.worklogsById,
			};

			worklogsByIdNext[id] = worklogNext;

			stateNextDraft = {
				...stateNextDraft,
				hasChanges: true,
				worklogsById: worklogsByIdNext,
			};
		};

		const removeWorklog = (
			worklogId: WorklogId,
		): void => {
			const worklogsByIdNext: typeof stateNextDraft.worklogsById = {
				...stateNextDraft.worklogsById,
			};

			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete worklogsByIdNext[worklogId];

			const worklogIdsNext = stateNextDraft.worklogIds.filter((worklogIdCurrent) => {
				return worklogIdCurrent !== worklogId;
			});

			stateNextDraft = {
				...stateNextDraft,
				hasChanges: true,
				worklogIds: worklogIdsNext,
				worklogsById: worklogsByIdNext,
			};
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
			stateNextDraft = {
				...stateNextDraft,
				selectedWorklogIds: PAGE_STATE_DEFAULT.selectedWorklogIds,
			};
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
};

export {
	moveWorklogsToGroup as moveWorklogsToGroupSpread,
};
