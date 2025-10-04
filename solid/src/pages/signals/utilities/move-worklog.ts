import {
	batch,
} from "solid-js";

import {
	type Worklog,
} from "@/features/worklog/types";

import {
	setPageState,
} from "../signals/page/base";

const moveWorklog = (
	params: Pick<
		Worklog,
		| "activityId"
		| "groupId"
		| "id"
	>,
): void => {
	const {
		activityId,
		groupId,
		id,
	} = params;

	batch(() => {
		setPageState(
			"worklogsById",
			id,
			{
				activityId,
				groupId,
			},
		);

		setPageState(
			"hasChanges",
			true,
		);
	});
};

export {
	moveWorklog,
};
