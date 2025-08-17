import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

import {
	type Dispatch,
} from "../store";
import {
	addTask,
} from "../utilities/add-task";

const AddTaskButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddTask = (): void => {
		dispatch(addTask());
	};

	return (
		<button
			onClick={handleAddTask}
			type="button"
		>
			Add task
		</button>
	);
};

export {
	AddTaskButton,
};
