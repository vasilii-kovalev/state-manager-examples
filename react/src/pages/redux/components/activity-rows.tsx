import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type TaskId,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectActivitiesForTask,
} from "../store/page/selectors";
import {
	ActivityRow,
} from "./activity-row";

interface ActivityRowsProps {
	taskId: TaskId;
}

const ActivityRows: FC<ActivityRowsProps> = ({
	taskId,
}) => {
	const activities = useSelector((state: RootState) => {
		return selectActivitiesForTask(
			state.page,
			taskId,
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
