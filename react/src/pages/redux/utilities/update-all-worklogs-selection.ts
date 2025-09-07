import {
	getEntities,
} from "@/features/pages/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogsSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelection {
	isSelected: boolean;
}

const updateAllWorklogsSelection = ({
	isSelected,
}: UpdateWorklogsSelection): Thunk<void> => {
	return (
		dispatch,
		getState,
	) => {
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
