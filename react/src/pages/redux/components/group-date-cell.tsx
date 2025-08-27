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
	type GroupId,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectReportingStatisticsByDateForGroup,
} from "../store/page/selectors";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface GroupDateCellProps {
	groupId: GroupId;
	date: DateString;
}

const GroupDateCell: FC<GroupDateCellProps> = ({
	groupId,
	date,
}) => {
	const reportingStatisticsForDate = useSelector((state: RootState) => {
		const reportingStatisticsByDate = selectReportingStatisticsByDateForGroup(
			state.page,
			groupId,
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
	GroupDateCell,
};
