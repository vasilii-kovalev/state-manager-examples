import {
	type Accessor,
	type Component,
} from "solid-js";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";
import {
	type GroupId,
} from "@/features/group/types";
import {
	type EntitySelectionState,
} from "@/features/page/types";

import {
	selectHasWorklogsInGroup,
	selectSelectionStateForGroup,
} from "../signals/page/derived";
import {
	updateWorklogsSelectionForGroup,
} from "../utilities/update-worklogs-selection-for-group";

interface SelectGroupCheckboxProps {
	groupId: GroupId;
}

const SelectGroupCheckbox: Component<SelectGroupCheckboxProps> = (
	props,
) => {
	const selectionState: Accessor<EntitySelectionState> = () => {
		return selectSelectionStateForGroup(props.groupId);
	};

	const hasWorklogs: Accessor<boolean> = () => {
		return selectHasWorklogsInGroup(props.groupId);
	};

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
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

export {
	SelectGroupCheckbox,
};
