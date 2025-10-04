import {
	batch,
} from "solid-js";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	selectActivitiesById,
	selectSelectedWorklogIds,
	selectWorklogsById,
} from "../signals/page/derived";
import {
	moveWorklogToActivity,
} from "./move-worklog-to-activity";
import {
	unselectWorklogs,
} from "./unselect-worklogs";

const moveWorklogsToActivity = (
	activityId: ActivityId,
): void => {
	const activitiesById = selectActivitiesById();
	const selectedWorklogIds = selectSelectedWorklogIds();
	const worklogsById = selectWorklogsById();

	for (const worklogId of selectedWorklogIds) {
		const worklog = worklogsById[worklogId];

		if (isUndefined(worklog)) {
			continue;
		}

		// No need to move if worklog is already in the target activity.
		if (worklog.activityId === activityId) {
			continue;
		}

		const activity = activitiesById[activityId];

		if (isUndefined(activity)) {
			continue;
		}

		moveWorklogToActivity({
			activityId: activity.id,
			groupId: activity.groupId,
			id: worklog.id,
		});
	}

	unselectWorklogs();
};

const moveWorklogsToActivityBatch: typeof moveWorklogsToActivity = (
	...params
) => {
	batch(() => {
		moveWorklogsToActivity(...params);
	});
};

export {
	moveWorklogsToActivityBatch as moveWorklogsToActivity,
};
