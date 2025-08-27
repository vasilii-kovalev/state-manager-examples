import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Activity,
} from "@/features/activity/types";

import {
	type RootState,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	ActivityInfoCell,
} from "./activity-info-cell";
import {
	Row,
} from "./row";
import {
	WorklogCell,
} from "./worklog-cell";

interface ActivityRowProps {
	activity: Activity;
}

const ActivityRow: FC<ActivityRowProps> = ({
	activity,
}) => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Row>
			<ActivityInfoCell
				activity={activity}
			/>

			{
				calendar.map((calendarDay) => {
					return (
						<WorklogCell
							activityId={activity.id}
							date={calendarDay.date}
							key={calendarDay.date}
							taskId={activity.taskId}
						/>
					);
				})
			}
		</Row>
	);
};

export {
	ActivityRow,
};
