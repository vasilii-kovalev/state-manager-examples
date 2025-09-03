import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type ActivityId,
} from "@/features/activity/types";
import {
	getClass,
} from "@/utilities/get-class";

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
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Move worklogs to activity";
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				return (
					<button
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control icon-button",
							])
						}
						onClick={handleMoveWorklogsToActivity}
						type="button"
					>
						←
					</button>
				);
			}}
			targetId={`move-worklogs-to-activity-button-${activityId}`}
		/>
	);
};

export {
	MoveWorklogsToActivityButton,
};
