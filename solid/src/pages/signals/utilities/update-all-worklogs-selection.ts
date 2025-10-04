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

interface UpdateWorklogsSelectionParams {
	isSelected: boolean;
}

const updateAllWorklogsSelection = (
	params: UpdateWorklogsSelectionParams,
): void => {
	const {
		isSelected,
	} = params;

	const worklogIds = selectWorklogIds();
	const worklogsById = selectWorklogsById();

	const worklogs = getEntities({
		byId: worklogsById,
		ids: worklogIds,
	});

	updateWorklogsSelection({
		isSelected,
		worklogs,
	});
};

export {
	updateAllWorklogsSelection,
};
