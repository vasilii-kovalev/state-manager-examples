import { For, type JSX } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";

import { selectCalendar } from "../signals/page/derived";
import { GroupDateCell } from "./group-date-cell";

interface GroupDateCellsProps {
	groupId: GroupId;
}

const GroupDateCells = (props: GroupDateCellsProps): JSX.Element => {
	return (
		<For each={selectCalendar()}>
			{(calendarDay) => {
				return <GroupDateCell date={calendarDay.date} groupId={props.groupId} />;
			}}
		</For>
	);
};

export { GroupDateCells };
