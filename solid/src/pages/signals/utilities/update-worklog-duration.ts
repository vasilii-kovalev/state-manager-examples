import {
	batch,
} from "solid-js";

import {
	type Worklog,
} from "@/features/worklog/types";

import {
	setPageState,
} from "../signals/page/base";

const updateWorklogDuration = (
	params: Pick<
		Worklog,
		| "duration"
		| "id"
	>,
): void => {
	const {
		duration,
		id,
	} = params;

	batch(() => {
		setPageState(
			"worklogsById",
			id,
			"duration",
			duration,
		);

		setPageState(
			"hasChanges",
			true,
		);
	});
};

export {
	updateWorklogDuration,
};
