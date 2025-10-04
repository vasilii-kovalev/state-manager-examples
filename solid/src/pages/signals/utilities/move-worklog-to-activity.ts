import {
	type Worklog,
} from "@/features/worklog/types";
import {
	isUndefined,
} from "@/utilities/is-undefined";

import {
	selectWorklogsById,
} from "../signals/page/derived";
import {
	moveWorklog,
} from "./move-worklog";
import {
	removeWorklog,
} from "./remove-worklog";
import {
	updateWorklogDuration,
} from "./update-worklog-duration";

type MoveWorklogToActivityParams = Pick<
	Worklog,
	| "activityId"
	| "groupId"
	| "id"
>;

const moveWorklogToActivity = (
	params: MoveWorklogToActivityParams,
): void => {
	const {
		activityId,
		groupId,
		id,
	} = params;

	const worklogsById = selectWorklogsById();

	const worklog = worklogsById[id];

	if (isUndefined(worklog)) {
		return;
	}

	const worklogs = Object.values(worklogsById);
	const existingWorklog = worklogs.find((
		worklogCurrent,
	) => {
		return (
			worklogCurrent.activityId === activityId
			&& worklogCurrent.date === worklog.date
		);
	});

	if (isUndefined(existingWorklog)) {
		moveWorklog({
			activityId,
			groupId,
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

export {
	moveWorklogToActivity,
};
