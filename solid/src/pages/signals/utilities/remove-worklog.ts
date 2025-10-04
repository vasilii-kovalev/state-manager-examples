import {
	batch,
} from "solid-js";

import {
	type WorklogId,
} from "@/features/worklog/types";

import {
	setPageState,
} from "../signals/page/base";

const removeWorklog = (
	worklogId: WorklogId,
): void => {
	batch(() => {
		setPageState(
			"worklogsById",
			worklogId,
			// @ts-expect-error A valid way of removing records from an object.
			undefined,
		);

		setPageState(
			"worklogIds",
			(
				worklogIds,
			) => {
				return worklogIds.filter((
					worklogIdCurrent,
				) => {
					return worklogIdCurrent !== worklogId;
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
	removeWorklog,
};
