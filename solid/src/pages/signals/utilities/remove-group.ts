import {
	batch,
} from "solid-js";

import {
	type GroupId,
} from "@/features/group/types";

import {
	setPageState,
} from "../signals/page/base";
import {
	selectActivitiesForGroup,
	selectWorklogsForGroup,
} from "../signals/page/derived";

const removeGroup = (
	groupId: GroupId,
): void => {
	batch(() => {
		setPageState(
			"groupsById",
			groupId,
			// @ts-expect-error A valid way of removing records from an object.
			undefined,
		);

		setPageState(
			"groupIds",
			(
				groupIds,
			) => {
				return groupIds.filter((
					groupIdCurrent,
				) => {
					return groupIdCurrent !== groupId;
				});
			},
		);

		// Removing activities.
		const activitiesForGroup = selectActivitiesForGroup(groupId);

		for (const activity of activitiesForGroup) {
			setPageState(
				"activitiesById",
				activity.id,
				// @ts-expect-error A valid way of removing records from an object.
				undefined,
			);
		}

		setPageState(
			"activityIds",
			(
				activityIds,
			) => {
				return activityIds.filter((
					activityIdCurrent,
				) => {
					return !activitiesForGroup.some((
						activity,
					) => {
						return activity.id === activityIdCurrent;
					});
				});
			},
		);

		// Removing worklogs.
		const worklogsForGroup = selectWorklogsForGroup(groupId);

		for (const worklog of worklogsForGroup) {
			setPageState(
				"worklogsById",
				worklog.id,
				// @ts-expect-error A valid way of removing records from an object.
				undefined,
			);
		}

		setPageState(
			"worklogIds",
			(
				worklogIds,
			) => {
				return worklogIds.filter((
					worklogIdCurrent,
				) => {
					return !worklogsForGroup.some((
						worklog,
					) => {
						return worklog.id === worklogIdCurrent;
					});
				});
			},
		);

		setPageState(
			"hasChanges",
			true,
		);
	});
};

export {
	removeGroup,
};
