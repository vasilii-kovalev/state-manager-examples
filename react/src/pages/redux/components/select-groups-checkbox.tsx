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
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasWorklogs,
	selectSelectionState,
} from "../store/page/selectors";
import {
	updateWorklogsSelection,
} from "../utilities/update-worklogs-selection";

const SelectGroupsCheckbox: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const selectionState = useSelector((state: RootState) => {
		return selectSelectionState(state.page);
	});
	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogs(state.page);
	});

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
		dispatch(
			updateWorklogsSelection({
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
