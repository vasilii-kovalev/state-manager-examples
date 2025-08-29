import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";
import {
	type GroupId,
} from "@/features/group/types";

import {
	type Dispatch,
	type RootState,
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

const SelectGroupCheckbox: FC<SelectGroupCheckboxProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const selectionState = useSelector((state: RootState) => {
		return selectSelectionStateForGroup(
			state.page,
			groupId,
		);
	});
	const hasWorklogs = useSelector((state: RootState) => {
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
