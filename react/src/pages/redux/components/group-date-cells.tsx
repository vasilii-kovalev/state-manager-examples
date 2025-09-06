import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type GroupId,
} from "@/features/group/types";

import {
	type RootState,
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
	const calendar = useSelector((state: RootState) => {
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
