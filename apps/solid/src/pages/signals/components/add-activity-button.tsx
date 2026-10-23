import { type JSX } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { addActivity } from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton = (props: AddActivityButtonProps): JSX.Element => {
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
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={buildClass(targetProps.class, control, iconButton)}
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

export { AddActivityButton };
