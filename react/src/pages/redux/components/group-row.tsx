import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type Group,
} from "@/features/group/types";

import {
	type RootState,
} from "../store";
import {
	selectCalendar,
} from "../store/page/selectors";
import {
	ActivityRows,
} from "./activity-rows";
import {
	GroupDateCell,
} from "./group-date-cell";
import {
	GroupInfoCell,
} from "./group-info-cell";
import {
	Row,
} from "./row";

interface GroupRowProps {
	group: Group;
}

const GroupRow: FC<GroupRowProps> = ({
	group,
}) => {
	const calendar = useSelector((state: RootState) => {
		return selectCalendar(state.page);
	});

	return (
		<Fragment>
			<Row>
				<GroupInfoCell
					group={group}
				/>

				{
					calendar.map((calendarDay) => {
						return (
							<GroupDateCell
								date={calendarDay.date}
								groupId={group.id}
								key={calendarDay.date}
							/>
						);
					})
				}
			</Row>

			<ActivityRows
				groupId={group.id}
			/>
		</Fragment>
	);
};

export {
	GroupRow,
};
