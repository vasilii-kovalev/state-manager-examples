import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type DateString,
} from "@/features/dates-and-time/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsByDateForActivity,
} from "../store/page/selectors";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface ActivityDateCellProps {
	activityId: ActivityId;
	date: DateString;
}

const ActivityDateCell: FC<ActivityDateCellProps> = ({
	activityId,
	date,
}) => {
	const reportingStatisticsForDate = useSelector((state: RootState) => {
		const reportingStatisticsByDate = selectReportingStatisticsByDateForActivity(
			state.page,
			activityId,
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
	ActivityDateCell,
};
