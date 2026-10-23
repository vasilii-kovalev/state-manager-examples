import { type Component } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { removeActivity } from "../utilities/remove-activity";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton: Component<RemoveActivityButtonProps> = (props) => {
	const isBusy = useIsBusy();

	const handleRemoveActivity = (): void => {
		removeActivity(props.activityId);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove activity and its worklogs";
			}}
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={getClass([targetProps.class, control, iconButton])}
						disabled={isBusy()}
						onClick={handleRemoveActivity}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-activity-button-${props.activityId}`}
		/>
	);
};

export { RemoveActivityButton };
