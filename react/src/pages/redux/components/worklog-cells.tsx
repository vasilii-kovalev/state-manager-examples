import {
	type FC,
	Fragment,
} from "react";

import {
	type ActivityId,
} from "@/features/activity/types";
import {
	type GroupId,
} from "@/features/group/types";

import {
	useApplicationSelector,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	WorklogCell,
} from "./worklog-cell";

interface WorklogCellsProps {
	activityId: ActivityId;
	groupId: GroupId;
}

const WorklogCells: FC<WorklogCellsProps> = ({
	activityId,
	groupId,
}) => {
	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	return (
		<Fragment>
			{
				calendar.map((calendarDay) => {
					return (
						<WorklogCell
							activityId={activityId}
							date={calendarDay.date}
							groupId={groupId}
							key={calendarDay.date}
							norm={calendarDay.norm}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	WorklogCells,
};
