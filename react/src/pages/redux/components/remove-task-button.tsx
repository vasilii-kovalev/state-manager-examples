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
	selectHasWorklogsInTask,
} from "../store/page/selectors";

interface RemoveTaskButtonProps {
	taskId: TaskId;
}

const RemoveTaskButton: FC<RemoveTaskButtonProps> = ({
	taskId,
}) => {
	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInTask(
			state.page,
			taskId,
		);
	});

	return (
		<button
			disabled={hasWorklogs}
			type="button"
		>
			Remove task
		</button>
	);
};

export {
	RemoveTaskButton,
};
