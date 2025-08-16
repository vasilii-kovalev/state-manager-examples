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
	type RootState,
} from "../store";
import {
	selectReportingStatisticsByDate,
} from "../store/page/selectors";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface SummaryDateCellProps {
	date: DateString;
}

const SummaryDateCell: FC<SummaryDateCellProps> = ({
	date,
}) => {
	const reportingStatisticsForDate = useSelector((state: RootState) => {
		const reportingStatisticsByDate = selectReportingStatisticsByDate(state.page);

		return reportingStatisticsByDate[date];
	});

	return (
		<TotalDurationCell
			reportingStatisticsSummary={reportingStatisticsForDate}
		/>
	);
};

export {
	SummaryDateCell,
};
