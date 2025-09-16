import {
	type FC,
} from "react";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type DateString,
	type Duration,
} from "@/features/dates-and-time/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectWorklogsForActivityForDate,
} from "../store/page/selectors";
import {
	Cell,
} from "./cell";
import {
	TotalDurationCell,
} from "./total-duration-cell";
import {
	WorklogInput,
} from "./worklog-input";

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
	groupId: GroupId;
	norm: Duration;
}

const WorklogCell: FC<WorklogCellProps> = (
	props,
) => {
	const {
		activityId,
		date,
		groupId,
		norm,
	} = props;

	const worklog = useApplicationSelector((
		state,
	) => {
		return selectWorklogsForActivityForDate(
			state.page,
			activityId,
			date,
		);
	});

	if (norm === 0) {
		return (
			<TotalDurationCell
				date={date}
				duration={worklog?.duration}
				location={`worklog-cell-${activityId}`}
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
