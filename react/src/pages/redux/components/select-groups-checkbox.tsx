import {
	type FC,
} from "react";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";

import {
	useApplicationDispatch,
	useApplicationSelector,
} from "../store";
import {
	selectHasWorklogs,
	selectSelectionState,
} from "../store/page/selectors";
import {
	updateAllWorklogsSelection,
} from "../utilities/update-all-worklogs-selection";

const SelectGroupsCheckbox: FC = () => {
	const dispatch = useApplicationDispatch();

	const selectionState = useApplicationSelector((
		state,
	) => {
		return selectSelectionState(state.page);
	});
	const hasWorklogs = useApplicationSelector((
		state,
	) => {
		return selectHasWorklogs(state.page);
	});

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
		dispatch(
			updateAllWorklogsSelection({
				isSelected: isSelectedNext,
			}),
		);
	};

	return (
		<SelectEntityCheckbox
			isDisabled={!hasWorklogs}
			onSelectionChange={handleSelectionChange}
			selectionState={selectionState}
		/>
	);
};

export {
	SelectGroupsCheckbox,
};
