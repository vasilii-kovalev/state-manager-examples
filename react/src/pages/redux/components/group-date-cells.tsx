import {
	type FC,
	Fragment,
} from "react";

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
	GroupDateCell,
} from "./group-date-cell";

interface GroupDateCellsProps {
	groupId: GroupId;
}

const GroupDateCells: FC<GroupDateCellsProps> = ({
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
						<GroupDateCell
							date={calendarDay.date}
							groupId={groupId}
							key={calendarDay.date}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	GroupDateCells,
};
