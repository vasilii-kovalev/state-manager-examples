import { type ReactNode } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";

import { SelectEntityCheckbox } from "../../../components/select-entity-checkbox";
import { useApplicationDispatch, useApplicationSelector } from "../store";
import { selectHasWorklogsInGroup, selectSelectionStateForGroup } from "../store/page/selectors";
import { updateWorklogsSelectionForGroup } from "../utilities/update-worklogs-selection-for-group";

interface SelectGroupCheckboxProps {
	groupId: GroupId;
}

const SelectGroupCheckbox = (props: SelectGroupCheckboxProps): ReactNode => {
	const { groupId } = props;

	const dispatch = useApplicationDispatch();

	const selectionState = useApplicationSelector((state) => {
		return selectSelectionStateForGroup(state.page, groupId);
	});
	const hasWorklogs = useApplicationSelector((state) => {
		return selectHasWorklogsInGroup(state.page, groupId);
	});

	const handleSelectionChange = (isSelectedNext: boolean): void => {
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

export { SelectGroupCheckbox };
