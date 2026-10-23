import { type ReactNode } from "react";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch, useApplicationSelector } from "../store";
import { selectHasSelectedWorklogs } from "../store/page/selectors";
import { moveWorklogsToActivity } from "../utilities/move-worklogs-to-activity";

interface MoveWorklogsToActivityButtonProps {
	activityId: ActivityId;
}

const MoveWorklogsToActivityButton = (props: MoveWorklogsToActivityButtonProps): ReactNode => {
	const { activityId } = props;

	const dispatch = useApplicationDispatch();

	const hasSelectedWorklogs = useApplicationSelector((state) => {
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
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={buildClass(className, control, iconButton)}
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

export { MoveWorklogsToActivityButton };
