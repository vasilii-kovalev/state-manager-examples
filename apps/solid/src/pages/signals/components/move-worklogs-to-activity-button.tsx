import { type JSX, Show } from "solid-js";

import { type ActivityId } from "packages/shared/src/features/activity/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { selectHasSelectedWorklogs } from "../signals/page/derived";
import { moveWorklogsToActivity } from "../utilities/move-worklogs-to-activity";

interface MoveWorklogsToActivityButtonProps {
	activityId: ActivityId;
}

const MoveWorklogsToActivityButton = (props: MoveWorklogsToActivityButtonProps): JSX.Element => {
	const isBusy = useIsBusy();

	const handleMoveWorklogsToActivity = (): void => {
		moveWorklogsToActivity(props.activityId);
	};

	return (
		<Show fallback={null} when={selectHasSelectedWorklogs()}>
			<Tooltip<HTMLButtonElement>
				renderBody={() => {
					return "Move worklogs to activity";
				}}
				renderTarget={(targetProps) => {
					return (
						<button
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={getClass([targetProps.class, control, iconButton])}
							disabled={isBusy()}
							onClick={handleMoveWorklogsToActivity}
							type="button"
						>
							←
						</button>
					);
				}}
				targetId={`move-worklogs-to-activity-button-${props.activityId}`}
			/>
		</Show>
	);
};

export { MoveWorklogsToActivityButton };
