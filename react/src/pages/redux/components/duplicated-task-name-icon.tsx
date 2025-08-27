import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type TaskId,
	type TaskName,
} from "@/features/task/types";

import {
	type RootState,
} from "../store";
import {
	selectTaskNames,
} from "../store/page/selectors";

interface DuplicatedTaskNameIconProps {
	name: TaskName;
	taskId: TaskId;
}

const DuplicatedTaskNameIcon: FC<DuplicatedTaskNameIconProps> = ({
	name,
	taskId,
}) => {
	const existingTaskNames = useSelector((state: RootState) => {
		return selectTaskNames(
			state.page,
			taskId,
		);
	});

	if (existingTaskNames.includes(name)) {
		return (
			<Fragment>
				(!)
			</Fragment>
		);
	}

	return null;
};

export {
	DuplicatedTaskNameIcon,
};
