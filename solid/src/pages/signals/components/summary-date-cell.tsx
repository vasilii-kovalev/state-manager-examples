import {
	type Component,
} from "solid-js";

import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";

import {
	selectReportedDurationForDate,
} from "../signals/page/derived";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface SummaryDateCellProps {
	date: DateString;
}

const SummaryDateCell: Component<SummaryDateCellProps> = (
	props,
) => {
	const reportedDuration = (): Duration => {
		return selectReportedDurationForDate(props.date);
	};

	return (
		<TotalDurationCell
			date={props.date}
			duration={reportedDuration()}
			location="summary-date-cell"
		/>
	);
};

export {
	SummaryDateCell,
};
