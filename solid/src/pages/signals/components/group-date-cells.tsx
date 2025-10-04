import {
	type Component,
	For,
} from "solid-js";

import {
	type GroupId,
} from "@/features/group/types";

import {
	selectCalendar,
} from "../signals/page/derived";
import {
	GroupDateCell,
} from "./group-date-cell";

interface GroupDateCellsProps {
	groupId: GroupId;
}

const GroupDateCells: Component<GroupDateCellsProps> = (
	props,
) => {
	return (
		<For
			each={selectCalendar()}
		>
			{
				(
					calendarDay,
				) => {
					return (
						<GroupDateCell
							date={calendarDay.date}
							groupId={props.groupId}
						/>
					);
				}
			}
		</For>
	);
};

export {
	GroupDateCells,
};
