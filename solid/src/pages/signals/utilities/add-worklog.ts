import {
	batch,
} from "solid-js";

import {
	type Worklog,
} from "@/features/worklog/types";

import {
	setPageState,
} from "../signals/page/base";

const addWorklog = (
	worklog: Worklog,
): void => {
	batch(() => {
		setPageState(
			"worklogIds",
			(
				worklogIds,
			) => {
				return [
					...worklogIds,
					worklog.id,
				];
			},
		);

		setPageState(
			"worklogsById",
			worklog.id,
			worklog,
		);

		setPageState(
			"hasChanges",
			true,
		);
	});
};

export {
	addWorklog,
};
