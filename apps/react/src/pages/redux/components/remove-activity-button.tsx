import { type ReactNode } from "react";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { useApplicationDispatch } from "../store";
import { removeActivity } from "../store/page/slice";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton = (props: RemoveActivityButtonProps): ReactNode => {
	const { activityId } = props;

	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

	const handleRemoveActivity = (): void => {
		dispatch(removeActivity(activityId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove activity and its worklogs";
			}}
			renderTarget={(targetProps) => {
				const { className, ...otherTargetProps } = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={buildClass(className, control, iconButton)}
						disabled={isBusy}
						onClick={handleRemoveActivity}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-activity-button-${activityId}`}
		/>
	);
};

export { RemoveActivityButton };
