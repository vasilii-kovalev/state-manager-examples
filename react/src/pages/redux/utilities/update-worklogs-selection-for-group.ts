import {
	type GroupId,
} from "@/features/group/types";
import {
	getEntities,
} from "@/features/pages/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogsSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelectionForGroup {
	groupId: GroupId;
	isSelected: boolean;
}

const updateWorklogsSelectionForGroup = ({
	groupId,
	isSelected,
}: UpdateWorklogsSelectionForGroup): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			worklogIds,
			worklogsById,
		} = getState().page;

		const activityWorklogs = getEntities({
			byId: worklogsById,
			filter: (worklog) => {
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
