import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type PageTask,
} from "@/features/page/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummaryForTask,
} from "../store/page/selectors";
import {
	AddActivityButton,
} from "./add-activity-button";
import {
	Cell,
} from "./cell";
import {
	RemoveTaskButton,
} from "./remove-task-button";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";
import {
	TaskNameInput,
} from "./task-name-input";

interface TaskInfoCellProps {
	task: PageTask;
}

const TaskInfoCell: FC<TaskInfoCellProps> = ({
	task,
}) => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummaryForTask(
			state.page,
			task.id,
		);
	});

	return (
		<Cell>
			<TaskNameInput
				id={task.id}
				name={task.name}
			/>

			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>

			<AddActivityButton
				taskId={task.id}
			/>

			<RemoveTaskButton
				taskId={task.id}
			/>
		</Cell>
	);
};

export {
	TaskInfoCell,
};
