import {
	type Component,
} from "solid-js";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";

import {
	selectHasWorklogs,
	selectSelectionStateForGroups,
} from "../signals/page/derived";
import {
	updateAllWorklogsSelection,
} from "../utilities/update-all-worklogs-selection";

const handleSelectionChange = (
	isSelectedNext: boolean,
): void => {
	updateAllWorklogsSelection({
		isSelected: isSelectedNext,
	});
};

const SelectGroupsCheckbox: Component = () => {
	return (
		<SelectEntityCheckbox
			isDisabled={!selectHasWorklogs()}
			onSelectionChange={handleSelectionChange}
			selectionState={selectSelectionStateForGroups()}
		/>
	);
};

export {
	SelectGroupsCheckbox,
};
