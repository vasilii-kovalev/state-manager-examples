import { type FC } from "react";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { useApplicationSelector } from "../store";
import { selectCalendar } from "../store/page/selectors";
import { WorklogCell } from "./worklog-cell";

interface WorklogCellsProps {
	activityId: ActivityId;
	groupId: GroupId;
}

const WorklogCells: FC<WorklogCellsProps> = (props) => {
	const { activityId, groupId } = props;

	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	return (
		<>
			{calendar.map((calendarDay) => {
				return (
					<WorklogCell
						activityId={activityId}
						date={calendarDay.date}
						groupId={groupId}
						key={calendarDay.date}
						norm={calendarDay.norm}
					/>
				);
			})}
		</>
	);
};

export { WorklogCells };
