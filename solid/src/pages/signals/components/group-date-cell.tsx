import {
	type Component,
} from "solid-js";

import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	selectReportedDurationForGroupForDate,
} from "../signals/page/derived";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface GroupDateCellProps {
	groupId: GroupId;
	date: DateString;
}

const GroupDateCell: Component<GroupDateCellProps> = (
	props,
) => {
	const reportedDuration = (): Duration => {
		return selectReportedDurationForGroupForDate(
			props.groupId,
			props.date,
		);
	};

	return (
		<TotalDurationCell
			date={props.date}
			duration={reportedDuration()}
			location={`group-date-cell-${props.groupId}`}
		/>
	);
};

export {
	GroupDateCell,
};
