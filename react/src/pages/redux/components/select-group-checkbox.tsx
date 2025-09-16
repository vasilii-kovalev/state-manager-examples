import {
	type FC,
} from "react";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";
import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationDispatch,
	useApplicationSelector,
} from "../store";
import {
	selectHasWorklogsInGroup,
	selectSelectionStateForGroup,
} from "../store/page/selectors";
import {
	updateWorklogsSelectionForGroup,
} from "../utilities/update-worklogs-selection-for-group";

interface SelectGroupCheckboxProps {
	groupId: GroupId;
}

const SelectGroupCheckbox: FC<SelectGroupCheckboxProps> = (
	props,
) => {
	const {
		groupId,
	} = props;

	const dispatch = useApplicationDispatch();

	const selectionState = useApplicationSelector((
		state,
	) => {
		return selectSelectionStateForGroup(
			state.page,
			groupId,
		);
	});
	const hasWorklogs = useApplicationSelector((
		state,
	) => {
		return selectHasWorklogsInGroup(
			state.page,
			groupId,
		);
	});

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
		dispatch(
			updateWorklogsSelectionForGroup({
				groupId,
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
	SelectGroupCheckbox,
};
