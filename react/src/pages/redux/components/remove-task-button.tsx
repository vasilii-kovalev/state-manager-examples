import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	type TaskId,
} from "@/features/task/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasWorklogsInTask,
} from "../store/page/selectors";
import {
	removeTask,
} from "../store/page/slice";

interface RemoveTaskButtonProps {
	taskId: TaskId;
}

const RemoveTaskButton: FC<RemoveTaskButtonProps> = ({
	taskId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInTask(
			state.page,
			taskId,
		);
	});

	const handleRemoveTask = (): void => {
		dispatch(removeTask(taskId));
	};

	return (
		<button
			disabled={hasWorklogs}
			onClick={handleRemoveTask}
			type="button"
		>
			Remove task
		</button>
	);
};

export {
	RemoveTaskButton,
};
