import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogsSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelectionParams {
	isSelected: boolean;
}

const updateAllWorklogsSelection = (
	params: UpdateWorklogsSelectionParams,
): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
		const {
			isSelected,
		} = params;

		const {
			worklogIds,
			worklogsById,
		} = getState().page;

		const worklogs = getEntities({
			byId: worklogsById,
			ids: worklogIds,
		});

		dispatch(
			updateWorklogsSelection({
				isSelected,
				worklogs,
			}),
		);
	};
};

export {
	updateAllWorklogsSelection,
};
