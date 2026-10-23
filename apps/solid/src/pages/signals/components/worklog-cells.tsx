import { For, type JSX } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { type GroupId } from "packages/shared/src/features/group/types";

import { selectCalendar } from "../signals/page/derived";
import { WorklogCell } from "./worklog-cell";

interface WorklogCellsProps {
	activityId: ActivityId;
	groupId: GroupId;
}

const WorklogCells = (props: WorklogCellsProps): JSX.Element => {
	return (
		<For each={selectCalendar()}>
			{(calendarDay) => {
				return (
					<WorklogCell
						activityId={props.activityId}
						date={calendarDay.date}
						groupId={props.groupId}
						norm={calendarDay.norm}
					/>
				);
			}}
		</For>
	);
};

export { WorklogCells };
