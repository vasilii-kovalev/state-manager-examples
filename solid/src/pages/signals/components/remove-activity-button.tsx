import {
	type Component,
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
	removeActivity,
} from "../utilities/remove-activity";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton: Component<RemoveActivityButtonProps> = (
	props,
) => {
	const isBusy = useIsBusy();

	const handleRemoveActivity = (): void => {
		removeActivity(props.activityId);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove activity and its worklogs";
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

export {
	RemoveActivityButton,
};
