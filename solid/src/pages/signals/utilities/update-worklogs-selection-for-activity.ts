import {
	type ActivityId,
} from "@/features/activity/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	selectWorklogIds,
	selectWorklogsById,
} from "../signals/page/derived";
import {
	updateWorklogsSelection,
} from "./update-worklogs-selection";

interface UpdateWorklogsSelectionForActivityParams {
	activityId: ActivityId;
	isSelected: boolean;
}

const updateWorklogsSelectionForActivity = (
	params: UpdateWorklogsSelectionForActivityParams,
): void => {
	const {
		activityId,
		isSelected,
	} = params;

	const worklogIds = selectWorklogIds();
	const worklogsById = selectWorklogsById();

	const activityWorklogs = getEntities({
		byId: worklogsById,
		filter: (
			worklog,
		) => {
			return worklog.activityId === activityId;
		},
		ids: worklogIds,
	});

	updateWorklogsSelection({
		isSelected,
		worklogs: activityWorklogs,
	});
};

export {
	updateWorklogsSelectionForActivity,
};
