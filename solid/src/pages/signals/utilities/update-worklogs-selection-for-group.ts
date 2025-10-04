import {
	type GroupId,
} from "@/features/group/types";
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

interface UpdateWorklogsSelectionForGroupParams {
	groupId: GroupId;
	isSelected: boolean;
}

const updateWorklogsSelectionForGroup = (
	params: UpdateWorklogsSelectionForGroupParams,
): void => {
	const {
		groupId,
		isSelected,
	} = params;

	const worklogIds = selectWorklogIds();
	const worklogsById = selectWorklogsById();

	const activityWorklogs = getEntities({
		byId: worklogsById,
		filter: (
			worklog,
		) => {
			return worklog.groupId === groupId;
		},
		ids: worklogIds,
	});

	updateWorklogsSelection({
		isSelected,
		worklogs: activityWorklogs,
	});
};

export {
	updateWorklogsSelectionForGroup,
};
