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
	selectHasWorklogsInActivity,
} from "../store/page/selectors";
import {
	removeActivity,
} from "../store/page/slice";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton: FC<RemoveActivityButtonProps> = ({
	activityId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInActivity(
			state.page,
			activityId,
		);
	});

	const handleRemoveActivity = (): void => {
		dispatch(removeActivity(activityId));
	};

	return (
		<button
			disabled={hasWorklogs}
			onClick={handleRemoveActivity}
			type="button"
		>
			Remove activity
		</button>
	);
};

export {
	RemoveActivityButton,
};
