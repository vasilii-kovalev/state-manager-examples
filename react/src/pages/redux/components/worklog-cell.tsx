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
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
	selectWorklogsForActivityByDate,
} from "../store/page/selectors";
import {
	Cell,
} from "./cell";
import {
	TotalDuration,
} from "./total-duration";
import {
	WorklogInput,
} from "./worklog-input";

interface WorklogCellProps {
	activityId: ActivityId;
	date: DateString;
}

const WorklogCell: FC<WorklogCellProps> = ({
	activityId,
	date,
}) => {
	const worklog = useSelector((state: RootState) => {
		const worklogsByDate = selectWorklogsForActivityByDate(
			state.page,
			activityId,
		);

		return worklogsByDate[date];
	});
	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const isWeekendDay = isWeekend(date);

	if (
		hasSelectedWorklogs
		|| isWeekendDay
	) {
		return (
			<Cell>
				<TotalDuration
					duration={worklog?.duration}
				/>
			</Cell>
		);
	}

	return (
		<Cell>
			<WorklogInput
				duration={worklog?.duration}
			/>
		</Cell>
	);
};

export {
	WorklogCell,
};
