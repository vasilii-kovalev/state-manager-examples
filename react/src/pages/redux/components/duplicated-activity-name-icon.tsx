import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
	type ActivityName,
} from "@/features/activity/types";
import {
	type TaskId,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectActivityNamesInTask,
} from "../store/page/selectors";

interface DuplicatedActivityNameIconProps {
	activityId: ActivityId;
	name: ActivityName;
	taskId: TaskId;
}

const DuplicatedActivityNameIcon: FC<DuplicatedActivityNameIconProps> = ({
	activityId,
	name,
	taskId,
}) => {
	const existingActivityNames = useSelector((state: RootState) => {
		return selectActivityNamesInTask(
			state.page,
			taskId,
			activityId,
		);
	});

	if (existingActivityNames.includes(name)) {
		return (
			<Fragment>
				(!)
			</Fragment>
		);
	}

	return null;
};

export {
	DuplicatedActivityNameIcon,
};
