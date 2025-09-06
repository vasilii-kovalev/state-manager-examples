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
	selectReportedDurationForDate,
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
	const reportedDuration = useSelector((state: RootState) => {
		return selectReportedDurationForDate(
			state.page,
			date,
		);
	});

	return (
		<TotalDurationCell
			date={date}
			duration={reportedDuration}
			location="summary-date-cell"
		/>
	);
};

export {
	SummaryDateCell,
};
