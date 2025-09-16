import {
	type FC,
} from "react";

import {
	type DateString,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectReportedDurationForGroupForDate,
} from "../store/page/selectors";
import {
	TotalDurationCell,
} from "./total-duration-cell";

interface GroupDateCellProps {
	groupId: GroupId;
	date: DateString;
}

const GroupDateCell: FC<GroupDateCellProps> = (
	props,
) => {
	const {
		groupId,
		date,
	} = props;

	const reportedDuration = useApplicationSelector((
		state,
	) => {
		return selectReportedDurationForGroupForDate(
			state.page,
			groupId,
			date,
		);
	});

	return (
		<TotalDurationCell
			date={date}
			duration={reportedDuration}
			location={`group-date-cell-${groupId}`}
		/>
	);
};

export {
	GroupDateCell,
};
