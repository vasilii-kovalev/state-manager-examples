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
	selectActivitiesForGroup,
} from "../store/page/selectors";
import {
	ActivityRow,
} from "./activity-row";

interface ActivityRowsProps {
	groupId: GroupId;
}

const ActivityRows: FC<ActivityRowsProps> = ({
	groupId,
}) => {
	const activities = useSelector((state: RootState) => {
		return selectActivitiesForGroup(
			state.page,
			groupId,
		);
	});

	return (
		<Fragment>
			{
				activities.map((activity) => {
					return (
						<ActivityRow
							activity={activity}
							key={activity.id}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	ActivityRows,
};
