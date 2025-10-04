import {
	type Worklog,
	type WorklogId,
} from "@/features/worklog/types";

import {
	setPageState,
} from "../signals/page/base";

interface UpdateWorklogSelectionParams {
	isSelected: boolean;
	worklogs: Array<Worklog>;
}

const updateWorklogsSelection = (
	params: UpdateWorklogSelectionParams,
): void => {
	const {
		isSelected,
		worklogs,
	} = params;

	const worklogIds = worklogs.map<WorklogId>((
		worklog,
	) => {
		return worklog.id;
	});

	setPageState(
		"selectedWorklogIds",
		(
			selectedWorklogIds,
		) => {
			if (isSelected) {
				return [
					...selectedWorklogIds,
					...worklogIds,
				];
			}

			return selectedWorklogIds.filter((
				worklogId,
			) => {
				return !worklogIds.includes(worklogId);
			});
		},
	);
};

export {
	updateWorklogsSelection,
};
