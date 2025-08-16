import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	type TaskId,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsByDateForTask,
} from "../store/page/selectors";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface TaskDateCellProps {
	taskId: TaskId;
	date: DateString;
}

const TaskDateCell: FC<TaskDateCellProps> = ({
	taskId,
	date,
}) => {
	const reportingStatisticsForDate = useSelector((state: RootState) => {
		const reportingStatisticsByDate = selectReportingStatisticsByDateForTask(
			state.page,
			taskId,
		);

		return reportingStatisticsByDate[date];
	});

	return (
		<TotalDurationCell
			reportingStatisticsSummary={reportingStatisticsForDate}
		/>
	);
};

export {
	TaskDateCell,
};
