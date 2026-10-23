import { type FC } from "react";

import { type GroupId } from "packages/shared/src/features/group/types";

import { useApplicationSelector } from "../store";
import { selectCalendar } from "../store/page/selectors";
import { GroupDateCell } from "./group-date-cell";

interface GroupDateCellsProps {
	groupId: GroupId;
}

const GroupDateCells: FC<GroupDateCellsProps> = (props) => {
	const { groupId } = props;

	const calendar = useApplicationSelector((state) => {
		return selectCalendar(state.page);
	});

	return (
		<>
			{calendar.map((calendarDay) => {
				return <GroupDateCell date={calendarDay.date} groupId={groupId} key={calendarDay.date} />;
			})}
		</>
	);
};

export { GroupDateCells };
