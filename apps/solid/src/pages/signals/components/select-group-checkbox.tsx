import { type Component } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";
import { type EntitySelectionState } from "packages/shared/src/features/page/types";

import { SelectEntityCheckbox } from "../../../components/select-entity-checkbox";
import { selectHasWorklogsInGroup, selectSelectionStateForGroup } from "../signals/page/derived";
import { updateWorklogsSelectionForGroup } from "../utilities/update-worklogs-selection-for-group";

interface SelectGroupCheckboxProps {
	groupId: GroupId;
}

const SelectGroupCheckbox: Component<SelectGroupCheckboxProps> = (props) => {
	const selectionState = (): EntitySelectionState => {
		return selectSelectionStateForGroup(props.groupId);
	};

	const hasWorklogs = (): boolean => {
		return selectHasWorklogsInGroup(props.groupId);
	};

	const handleSelectionChange = (isSelectedNext: boolean): void => {
		updateWorklogsSelectionForGroup({
			groupId: props.groupId,
			isSelected: isSelectedNext,
		});
	};

	return (
		<SelectEntityCheckbox
			isDisabled={!hasWorklogs()}
			onSelectionChange={handleSelectionChange}
			selectionState={selectionState()}
		/>
	);
};

export { SelectGroupCheckbox };
