import { type Component } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { type EntitySelectionState } from "packages/shared/src/features/page/types";

import { SelectEntityCheckbox } from "../../../components/select-entity-checkbox";
import { selectHasWorklogsInActivity, selectSelectionStateForActivity } from "../signals/page/derived";
import { updateWorklogsSelectionForActivity } from "../utilities/update-worklogs-selection-for-activity";

interface SelectActivityCheckboxProps {
	activityId: ActivityId;
}

const SelectActivityCheckbox: Component<SelectActivityCheckboxProps> = (props) => {
	const selectionState = (): EntitySelectionState => {
		return selectSelectionStateForActivity(props.activityId);
	};

	const hasWorklogs = (): boolean => {
		return selectHasWorklogsInActivity(props.activityId);
	};

	const handleSelectionChange = (isSelectedNext: boolean): void => {
		updateWorklogsSelectionForActivity({
			activityId: props.activityId,
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

export { SelectActivityCheckbox };
