import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type TaskId,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectIsTaskSelected,
} from "../store/page/selectors";

interface TaskSelectionCheckboxProps {
	taskId: TaskId;
}

const TaskSelectionCheckbox: FC<TaskSelectionCheckboxProps> = ({
	taskId,
}) => {
	const isChecked = useSelector((state: RootState) => {
		return selectIsTaskSelected(
			state.page,
			taskId,
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
	TaskSelectionCheckbox,
};
