import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	type RootState,
} from "../store";
import {
	selectIsActivitySelected,
} from "../store/page/selectors";

interface ActivitySelectionCheckboxProps {
	activityId: ActivityId;
}

const ActivitySelectionCheckbox: FC<ActivitySelectionCheckboxProps> = ({
	activityId,
}) => {
	const isChecked = useSelector((state: RootState) => {
		return selectIsActivitySelected(
			state.page,
			activityId,
		);
	});

	return (
		<input
			checked={isChecked}
			type="checkbox"
		/>
	);
};

export {
	ActivitySelectionCheckbox,
};
