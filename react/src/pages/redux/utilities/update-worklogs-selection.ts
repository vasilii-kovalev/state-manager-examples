import {
	getEntities,
} from "@/features/page/utilities/get-entities";

import {
	type Thunk,
} from "../store";
import {
	updateWorklogSelection,
} from "../store/page/slice";

interface UpdateWorklogsSelection {
	isSelected: boolean;
}

const updateWorklogsSelection = ({
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
			updateWorklogSelection({
				isSelected,
				worklogs,
			}),
		);
	};
};

export {
	updateWorklogsSelection,
};
