import { type ReactNode } from "react";

import { type ActivityId } from "packages/shared/src/features/activity/types";

import { SelectEntityCheckbox } from "../../../components/select-entity-checkbox";
import { useApplicationDispatch, useApplicationSelector } from "../store";
import { selectHasWorklogsInActivity, selectSelectionStateForActivity } from "../store/page/selectors";
import { updateWorklogsSelectionForActivity } from "../utilities/update-worklogs-selection-for-activity";

interface SelectActivityCheckboxProps {
	activityId: ActivityId;
}

const SelectActivityCheckbox = (props: SelectActivityCheckboxProps): ReactNode => {
	const { activityId } = props;

	const dispatch = useApplicationDispatch();

	const selectionState = useApplicationSelector((state) => {
		return selectSelectionStateForActivity(state.page, activityId);
	});
	const hasWorklogs = useApplicationSelector((state) => {
		return selectHasWorklogsInActivity(state.page, activityId);
	});

	const handleSelectionChange = (isSelectedNext: boolean): void => {
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

export { SelectActivityCheckbox };
