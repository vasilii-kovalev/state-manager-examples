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
	selectReportedDurationForDateForGroup,
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
	const reportedDuration = useSelector((state: RootState) => {
		return selectReportedDurationForDateForGroup(
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
