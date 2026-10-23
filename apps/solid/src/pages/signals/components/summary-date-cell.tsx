import { type JSX } from "solid-js";

import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";

import { selectReportedDurationForDate } from "../signals/page/derived";
import { TotalDurationCell } from "./total-duration-cell";

interface SummaryDateCellProps {
	date: DateString;
}

const SummaryDateCell = (props: SummaryDateCellProps): JSX.Element => {
	const reportedDuration = (): Duration => {
		return selectReportedDurationForDate(props.date);
	};

	return <TotalDurationCell date={props.date} duration={reportedDuration()} location="summary-date-cell" />;
};

export { SummaryDateCell };
