import {
	batch,
} from "solid-js";

import {
	type GroupId,
} from "@/features/group/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	selectActivitiesById,
	selectSelectedWorklogIds,
	selectWorklogsById,
} from "../signals/page/derived";
import {
	addActivity,
} from "./add-activity";
import {
	moveWorklog,
} from "./move-worklog";
import {
	moveWorklogToActivity,
} from "./move-worklog-to-activity";
import {
	unselectWorklogs,
} from "./unselect-worklogs";

const moveWorklogsToGroup = (
	groupId: GroupId,
): void => {
	const selectedWorklogIds = selectSelectedWorklogIds();
	const worklogsById = selectWorklogsById();

	for (const worklogId of selectedWorklogIds) {
		const worklog = worklogsById[worklogId];

		if (isUndefined(worklog)) {
			continue;
		}

		// No need to move if worklog is already in the target group.
		if (worklog.groupId === groupId) {
			continue;
		}

		// The state may update in the loop, so we need to access the latest one on each iteration.
		const activitiesById = selectActivitiesById();

		const activity = activitiesById[worklog.activityId];

		if (isUndefined(activity)) {
			continue;
		}

		const activities = Object.values(activitiesById);

		const existingActivity = activities.find((
			activityCurrent,
		) => {
			return (
				activityCurrent.groupId === groupId
				&& activityCurrent.name === activity.name
			);
		});

		if (isUndefined(existingActivity)) {
			const activityId = addActivity({
				groupId,
				name: activity.name,
			});

			moveWorklog({
				activityId,
				groupId,
				id: worklog.id,
			});
		} else {
			moveWorklogToActivity({
				activityId: existingActivity.id,
				groupId: existingActivity.groupId,
				id: worklog.id,
			});
		}
	}

	unselectWorklogs();
};

const moveWorklogsToGroupBatch: typeof moveWorklogsToGroup = (
	...params
) => {
	batch(() => {
		moveWorklogsToGroup(...params);
	});
};

export {
	moveWorklogsToGroupBatch as moveWorklogsToGroup,
};
