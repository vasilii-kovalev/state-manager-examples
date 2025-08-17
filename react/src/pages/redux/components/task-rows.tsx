import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectTasks,
} from "../store/page/selectors";
import {
	TaskRow,
} from "./task-row";

const TaskRows: FC = () => {
	const tasks = useSelector((state: RootState) => {
		return selectTasks(state.page);
	});

	return (
		<Fragment>
			{
				tasks.map((task) => {
					return (
						<TaskRow
							key={task.id}
							task={task}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	TaskRows,
};
