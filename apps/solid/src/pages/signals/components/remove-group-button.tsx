import { type Component } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { removeGroup } from "../utilities/remove-group";

interface RemoveGroupButtonProps {
	groupId: GroupId;
}

const RemoveGroupButton: Component<RemoveGroupButtonProps> = (props) => {
	const isBusy = useIsBusy();

	const handleRemoveGroup = (): void => {
		removeGroup(props.groupId);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove group, its activities and worklogs";
			}}
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={getClass([targetProps.class, control, iconButton])}
						disabled={isBusy()}
						onClick={handleRemoveGroup}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-group-button-${props.groupId}`}
		/>
	);
};

export { RemoveGroupButton };
