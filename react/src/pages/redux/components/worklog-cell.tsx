import {
	isWeekend,
} from "date-fns";
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
	type GroupId,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectWorklogsForActivityByDate,
} from "../store/page/selectors";
import {
	Cell,
} from "./cell";
import {
	WorklogInput,
} from "./worklog-input";

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
	groupId: GroupId;
}

const WorklogCell: FC<WorklogCellProps> = ({
	activityId,
	date,
	groupId,
}) => {
	const worklog = useSelector((state: RootState) => {
		const worklogsByDate = selectWorklogsForActivityByDate(
			state.page,
			activityId,
		);

		return worklogsByDate[date];
	});

	const isWeekendDay = isWeekend(date);

	if (isWeekendDay) {
		return (
			<Cell
				className="bg-weekend"
			/>
		);
	}

	return (
		<Cell
			className="p-0"
		>
			<WorklogInput
				activityId={activityId}
				date={date}
				duration={worklog?.duration}
				groupId={groupId}
				id={worklog?.id}
				// To reset the internal state of the input when the duration changes outside.
				key={worklog?.duration ?? 0}
			/>
		</Cell>
	);
};

export {
	WorklogCell,
};
