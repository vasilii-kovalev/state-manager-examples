import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsSummary,
} from "../store/page/selectors";
import {
	AddTaskButton,
} from "./add-task-button";
import {
	Cell,
} from "./cell";
import {
	ReportedDurationOfNorm,
} from "./reported-duration-of-norm";

const SummaryInfoCell: FC = () => {
	const reportingStatisticsSummary = useSelector((state: RootState) => {
		return selectReportingStatisticsSummary(state.page);
	});

	return (
		<Cell>
			<ReportedDurationOfNorm
				norm={reportingStatisticsSummary.norm}
				reported={reportingStatisticsSummary.reported}
			/>

			<AddTaskButton/>
		</Cell>
	);
};

export {
	SummaryInfoCell,
};
