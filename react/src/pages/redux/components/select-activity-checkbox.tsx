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
	type ActivityId,
} from "@/features/activity/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasWorklogsInActivity,
	selectSelectionStateForActivity,
} from "../store/page/selectors";
import {
	updateWorklogsSelectionForActivity,
} from "../utilities/update-worklogs-selection-for-activity";

interface SelectActivityCheckboxProps {
	activityId: ActivityId;
}

const SelectActivityCheckbox: FC<SelectActivityCheckboxProps> = ({
	activityId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const selectionState = useSelector((state: RootState) => {
		return selectSelectionStateForActivity(
			state.page,
			activityId,
		);
	});
	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInActivity(
			state.page,
			activityId,
		);
	});

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
		dispatch(
			updateWorklogsSelectionForActivity({
				activityId,
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
	SelectActivityCheckbox,
};
