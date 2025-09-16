import {
	type GroupId,
} from "@/features/group/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogsSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelectionForGroupParams {
	groupId: GroupId;
	isSelected: boolean;
}

const updateWorklogsSelectionForGroup = (
	params: UpdateWorklogsSelectionForGroupParams,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			groupId,
			isSelected,
		} = params;

		const {
			worklogIds,
			worklogsById,
		} = getState().page;

		const activityWorklogs = getEntities({
			byId: worklogsById,
			filter: (
				worklog,
			) => {
				return worklog.groupId === groupId;
			},
			ids: worklogIds,
		});

		dispatch(
			updateWorklogsSelection({
				isSelected,
				worklogs: activityWorklogs,
			}),
		);
	};
};

export {
	updateWorklogsSelectionForGroup,
};
