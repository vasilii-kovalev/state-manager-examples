import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	moveWorklogsToActivity,
} from "../utilities/move-worklogs-to-activity";

interface MoveWorklogsToActivityButtonProps {
	activityId: ActivityId;
}

const MoveWorklogsToActivityButton: FC<MoveWorklogsToActivityButtonProps> = ({
	activityId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	if (!hasSelectedWorklogs) {
		return null;
	}

	const handleMoveWorklogsToActivity = (): void => {
		dispatch(moveWorklogsToActivity(activityId));
	};

	return (
		<button
			onClick={handleMoveWorklogsToActivity}
			type="button"
		>
			Move worklogs to activity
		</button>
	);
};

export {
	MoveWorklogsToActivityButton,
};
