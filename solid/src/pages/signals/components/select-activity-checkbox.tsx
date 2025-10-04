import {
	type Component,
} from "solid-js";

import {
	SelectEntityCheckbox,
} from "@/components/select-entity-checkbox";
import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type EntitySelectionState,
} from "@/features/page/types";

import {
	selectHasWorklogsInActivity,
	selectSelectionStateForActivity,
} from "../signals/page/derived";
import {
	updateWorklogsSelectionForActivity,
} from "../utilities/update-worklogs-selection-for-activity";

interface SelectActivityCheckboxProps {
	activityId: ActivityId;
}

const SelectActivityCheckbox: Component<SelectActivityCheckboxProps> = (
	props,
) => {
	const selectionState = (): EntitySelectionState => {
		return selectSelectionStateForActivity(props.activityId);
	};

	const hasWorklogs = (): boolean => {
		return selectHasWorklogsInActivity(props.activityId);
	};

	const handleSelectionChange = (
		isSelectedNext: boolean,
	): void => {
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

export {
	SelectActivityCheckbox,
};
