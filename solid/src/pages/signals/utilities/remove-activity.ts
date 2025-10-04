import {
	batch,
} from "solid-js";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	setPageState,
} from "../signals/page/base";
import {
	selectWorklogsForActivity,
} from "../signals/page/derived";

const removeActivity = (
	activityId: ActivityId,
): void => {
	batch(() => {
		setPageState(
			"activitiesById",
			activityId,
			// @ts-expect-error A valid way of removing records from an object.
			undefined,
		);

		setPageState(
			"activityIds",
			(
				activityIds,
			) => {
				return activityIds.filter((
					activityIdCurrent,
				) => {
					return activityIdCurrent !== activityId;
				});
			},
		);

		// Removing worklogs.
		const worklogsForActivity = selectWorklogsForActivity(activityId);

		for (const worklog of worklogsForActivity) {
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
					return !worklogsForActivity.some((
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
	removeActivity,
};
