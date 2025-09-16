import {
	type FC,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type ActivityId,
} from "@/features/activity/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	useApplicationDispatch,
	useApplicationSelector,
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

const MoveWorklogsToActivityButton: FC<MoveWorklogsToActivityButtonProps> = (
	props,
) => {
	const {
		activityId,
	} = props;

	const dispatch = useApplicationDispatch();

	const hasSelectedWorklogs = useApplicationSelector((
		state,
	) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const isBusy = useIsBusy();

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
			renderTarget={(
				targetProps,
			) => {
				const {
					className,
					tooltipId,
					...otherTargetProps
				} = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control icon-button",
							])
						}
						disabled={isBusy}
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
