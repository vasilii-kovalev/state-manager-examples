import {
	type Component,
	Show,
} from "solid-js";

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
	selectHasSelectedWorklogs,
} from "../signals/page/derived";
import {
	moveWorklogsToActivity,
} from "../utilities/move-worklogs-to-activity";

interface MoveWorklogsToActivityButtonProps {
	activityId: ActivityId;
}

const MoveWorklogsToActivityButton: Component<MoveWorklogsToActivityButtonProps> = (
	props,
) => {
	const isBusy = useIsBusy();

	const handleMoveWorklogsToActivity = (): void => {
		moveWorklogsToActivity(props.activityId);
	};

	return (
		<Show
			fallback={null}
			when={selectHasSelectedWorklogs()}
		>
			<Tooltip<HTMLButtonElement>
				renderBody={() => {
					return "Move worklogs to activity";
				}}
				renderTarget={(
					targetProps,
				) => {
					return (
						<button
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={
								getClass([
									targetProps.class,
									"control icon-button",
								])
							}
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

export {
	MoveWorklogsToActivityButton,
};
