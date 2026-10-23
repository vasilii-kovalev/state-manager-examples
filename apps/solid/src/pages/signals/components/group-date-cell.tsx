import { type JSX } from "solid-js";

import { type DateString, type Duration } from "packages/shared/src/features/dates-and-time/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectReportedDurationForGroupForDate } from "../signals/page/derived";
import { TotalDurationCell } from "./total-duration-cell";

interface GroupDateCellProps {
	groupId: GroupId;
	date: DateString;
}

const GroupDateCell = (props: GroupDateCellProps): JSX.Element => {
	const reportedDuration = (): Duration => {
		return selectReportedDurationForGroupForDate(props.groupId, props.date);
	};

	return (
		<TotalDurationCell date={props.date} duration={reportedDuration()} location={`group-date-cell-${props.groupId}`} />
	);
};

export { GroupDateCell };
