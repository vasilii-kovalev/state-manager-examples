import {
	type Component,
} from "solid-js";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type GroupId,
} from "@/features/group/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	addActivity,
} from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton: Component<AddActivityButtonProps> = (
	props,
) => {
	const isBusy = useIsBusy();

	const handleAddActivity = (): void => {
		addActivity({
			groupId: props.groupId,
		});
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add activity";
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
						onClick={handleAddActivity}
						type="button"
					>
						+
					</button>
				);
			}}
			targetId={`add-activity-button-${props.groupId}`}
		/>
	);
};

export {
	AddActivityButton,
};
