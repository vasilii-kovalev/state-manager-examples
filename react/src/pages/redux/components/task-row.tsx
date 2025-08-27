import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Task,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	ActivityRows,
} from "./activity-rows";
import {
	Row,
} from "./row";
import {
	TaskDateCell,
} from "./task-date-cell";
import {
	TaskInfoCell,
} from "./task-info-cell";

interface TaskRowProps {
	task: Task;
}

const TaskRow: FC<TaskRowProps> = ({
	task,
}) => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Fragment>
			<Row>
				<TaskInfoCell
					task={task}
				/>

				{
					calendar.map((calendarDay) => {
						return (
							<TaskDateCell
								date={calendarDay.date}
								key={calendarDay.date}
								taskId={task.id}
							/>
						);
					})
				}
			</Row>

			<ActivityRows
				taskId={task.id}
			/>
		</Fragment>
	);
};

export {
	TaskRow,
};
