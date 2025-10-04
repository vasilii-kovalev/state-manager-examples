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
	removeGroup,
} from "../utilities/remove-group";

interface RemoveGroupButtonProps {
	groupId: GroupId;
}

const RemoveGroupButton: Component<RemoveGroupButtonProps> = (
	props,
) => {
	const isBusy = useIsBusy();

	const handleRemoveGroup = (): void => {
		removeGroup(props.groupId);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove group, its activities and worklogs";
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

export {
	RemoveGroupButton,
};
