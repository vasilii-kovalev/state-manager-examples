import { type ActivityId } from "packages/shared/src/features/activity/types";
import { getEntities } from "packages/shared/src/features/page/utilities/get-entities";

import { type Thunk } from "../store";
import { updateWorklogsSelection } from "../store/page/slice";

interface UpdateWorklogsSelectionForActivityParams {
	activityId: ActivityId;
	isSelected: boolean;
}

const updateWorklogsSelectionForActivity = (params: UpdateWorklogsSelectionForActivityParams): Thunk<void> => {
	return (dispatch, getState) => {
		const { activityId, isSelected } = params;

		const { worklogIds, worklogsById } = getState().page;

		const activityWorklogs = getEntities({
			byId: worklogsById,
			filter: (worklog) => {
				return worklog.activityId === activityId;
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

export { updateWorklogsSelectionForActivity };
