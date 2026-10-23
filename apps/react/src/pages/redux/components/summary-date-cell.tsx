import { type ReactNode } from "react";

import { type DateString } from "packages/shared/src/features/dates-and-time/types";

import { useApplicationSelector } from "../store";
import { selectReportedDurationForDate } from "../store/page/selectors";
import { TotalDurationCell } from "./total-duration-cell";

interface SummaryDateCellProps {
	date: DateString;
}

const SummaryDateCell = (props: SummaryDateCellProps): ReactNode => {
	const { date } = props;

	const reportedDuration = useApplicationSelector((state) => {
		return selectReportedDurationForDate(state.page, date);
	});

	return <TotalDurationCell date={date} duration={reportedDuration} location="summary-date-cell" />;
};

export { SummaryDateCell };
