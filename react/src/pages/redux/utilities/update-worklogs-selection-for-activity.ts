import {
	type ActivityId,
} from "@/features/activity/types";
import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelectionForActivity {
	activityId: ActivityId;
	isSelected: boolean;
}

const updateWorklogsSelectionForActivity = ({
	activityId,
	isSelected,
}: UpdateWorklogsSelectionForActivity): Thunk<void> => {
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
				return worklog.activityId === activityId;
			},
			ids: worklogIds,
		});

		dispatch(
			updateWorklogSelection({
				isSelected,
				worklogs: activityWorklogs,
			}),
		);
	};
};

export {
	updateWorklogsSelectionForActivity,
};
