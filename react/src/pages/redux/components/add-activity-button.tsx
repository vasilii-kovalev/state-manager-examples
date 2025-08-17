import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

import {
	type TaskId,
} from "@/features/task/types";

import {
	type Dispatch,
} from "../store";
import {
	addActivity,
} from "../utilities/add-activity";

interface AddActivityButtonProps {
	taskId: TaskId;
}

const AddActivityButton: FC<AddActivityButtonProps> = ({
	taskId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddActivity = (): void => {
		dispatch(addActivity(taskId));
	};

	return (
		<button
			onClick={handleAddActivity}
			type="button"
		>
			Add activity
		</button>
	);
};

export {
	AddActivityButton,
};
