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
	Cell,
} from "./cell";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

interface TaskTitleCellProps {
	task: PageTask;
}

const TaskTitleCell: FC<TaskTitleCellProps> = ({
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
			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>
		</Cell>
	);
};

export {
	TaskTitleCell,
};
