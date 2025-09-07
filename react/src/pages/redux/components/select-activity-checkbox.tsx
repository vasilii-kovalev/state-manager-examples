import {
	type FC,
} from "react";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";
import {
	type ActivityId,
} from "@/features/activity/types";

import {
	useApplicationDispatch,
	useApplicationSelector,
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
	const dispatch = useApplicationDispatch();

	const selectionState = useApplicationSelector((state) => {
		return selectSelectionStateForActivity(
			state.page,
			activityId,
		);
	});
	const hasWorklogs = useApplicationSelector((state) => {
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
