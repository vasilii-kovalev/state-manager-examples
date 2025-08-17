import {
	type FC,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type ActivityId,
} from "@/features/activity/types";

import {
	type RootState,
} from "../store";
import {
	selectHasWorklogsInActivity,
} from "../store/page/selectors";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton: FC<RemoveActivityButtonProps> = ({
	activityId,
}) => {
	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInActivity(
			state.page,
			activityId,
		);
	});

	return (
		<button
			disabled={hasWorklogs}
			type="button"
		>
			Remove activity
		</button>
	);
};

export {
	RemoveActivityButton,
};
